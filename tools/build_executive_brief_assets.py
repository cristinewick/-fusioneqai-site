#!/usr/bin/env python3
"""Build the printable Executive Brief and viewer images from brief.html.

The web brief is the canonical copy source. This builder extracts the executive
sections from that page, lays them out as a five-page US Letter PDF,
and renders the page images used by executive-brief-viewer.html.
"""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from lxml import html
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "brief.html"
PDF_PATH = ROOT / "assets" / "fusioneq-ai-executive-brief.pdf"
PAGE_PREFIX = ROOT / "assets" / "fusioneq-executive-brief-page"
LOGO_PATH = ROOT / "assets" / "fusioneqai-logo-light.png"

GREEN = colors.HexColor("#2f7f35")
LIGHT_GREEN = colors.HexColor("#edf6e9")
GOLD = colors.HexColor("#9a6f1d")
INK = colors.HexColor("#17201b")
BODY = colors.HexColor("#424b45")
MUTED = colors.HexColor("#6b756e")
LINE = colors.HexColor("#dce4dd")
PALE = colors.HexColor("#f6f8f6")


def register_fonts() -> tuple[str, str]:
    candidates = [
        (Path("/System/Library/Fonts/Supplemental/Arial.ttf"), "Arial"),
        (Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf"), "Arial-Bold"),
    ]
    if all(path.exists() for path, _ in candidates):
        for path, name in candidates:
            pdfmetrics.registerFont(TTFont(name, str(path)))
        return "Arial", "Arial-Bold"
    return "Helvetica", "Helvetica-Bold"


REGULAR, BOLD = register_fonts()


def parse_source():
    return html.fromstring(HTML_PATH.read_text(encoding="utf-8"))


DOC = parse_source()


def node(xpath: str):
    matches = DOC.xpath(xpath)
    if not matches:
        raise RuntimeError(f"Executive Brief source is missing: {xpath}")
    return matches[0]


def clean_text(element) -> str:
    return " ".join(element.text_content().split())


def text(xpath: str) -> str:
    return clean_text(node(xpath))


def texts(xpath: str) -> list[str]:
    return [clean_text(item) for item in DOC.xpath(xpath)]


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Kicker", fontName=BOLD, fontSize=8, leading=10, textColor=GOLD,
    spaceAfter=8, uppercase=True,
))
styles.add(ParagraphStyle(
    name="TitleLarge", fontName=REGULAR, fontSize=28, leading=32,
    textColor=INK, spaceAfter=13,
))
styles.add(ParagraphStyle(
    name="PageTitle", fontName=REGULAR, fontSize=22, leading=26,
    textColor=INK, spaceAfter=11,
))
styles.add(ParagraphStyle(
    name="SectionHeading", fontName=BOLD, fontSize=15, leading=18,
    textColor=INK, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="BodyCustom", fontName=REGULAR, fontSize=9.3, leading=13.1,
    textColor=BODY, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="BodySmall", fontName=REGULAR, fontSize=8.3, leading=11.4,
    textColor=BODY, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Label", fontName=BOLD, fontSize=7.6, leading=9.2,
    textColor=GOLD, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="CardTitle", fontName=BOLD, fontSize=10.2, leading=12.7,
    textColor=INK, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="Quote", fontName=BOLD, fontSize=14.5, leading=18,
    textColor=GREEN, leftIndent=8, rightIndent=8, alignment=TA_LEFT,
))
styles.add(ParagraphStyle(
    name="Callout", fontName=BOLD, fontSize=11.5, leading=15,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="Legal", fontName=REGULAR, fontSize=6.6, leading=8.4,
    textColor=MUTED,
))


def P(value: str, style: str = "BodyCustom") -> Paragraph:
    return Paragraph(value, styles[style])


def card(label: str, title: str, copy: str) -> list:
    return [P(label.upper(), "Label"), P(title, "CardTitle"), P(copy, "BodySmall")]


def three_cards(items: list[tuple[str, str, str]], widths=None, row_height=None) -> Table:
    table = Table([[card(*item) for item in items]], colWidths=widths or [2.12 * inch] * 3,
                  rowHeights=[row_height] if row_height else None)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
    ]))
    return table


def two_column_cards(items: list[tuple[str, str, str]], row_height=None) -> Table:
    rows = []
    for i in range(0, len(items), 2):
        row = [card(*items[i])]
        row.append(card(*items[i + 1]) if i + 1 < len(items) else [])
        rows.append(row)
    table = Table(rows, colWidths=[3.18 * inch, 3.18 * inch],
                  rowHeights=[row_height] * len(rows) if row_height else None)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
    ]))
    return table


def label_value_rows(items: list[tuple[str, str]], widths=None) -> Table:
    rows = [[P(label.upper(), "Label"), P(copy, "BodySmall")] for label, copy in items]
    table = Table(rows, colWidths=widths or [1.55 * inch, 4.8 * inch])
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    return table


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    if LOGO_PATH.exists():
        canvas.drawImage(str(LOGO_PATH), 0.62 * inch, height - 0.64 * inch,
                         width=1.82 * inch, height=0.47 * inch,
                         preserveAspectRatio=True, mask="auto")
    canvas.setFont(REGULAR, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.62 * inch, height - 0.74 * inch,
                      "Fusion: Where Emotional Intelligence meets Artificial Intelligence")
    canvas.drawRightString(width - 0.62 * inch, height - 0.42 * inch, "EXECUTIVE BRIEF")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.62 * inch, height - 0.86 * inch, width - 0.62 * inch, height - 0.86 * inch)
    canvas.line(0.62 * inch, 0.48 * inch, width - 0.62 * inch, 0.48 * inch)
    canvas.setFont(REGULAR, 7)
    canvas.drawString(0.62 * inch, 0.28 * inch, "PROPRIETARY | Deal readiness for revenue teams")
    canvas.drawCentredString(width / 2, 0.28 * inch, str(doc.page))
    canvas.drawRightString(width - 0.62 * inch, 0.28 * inch,
                           "© 2026 FusionEQ AI. All rights reserved.")
    canvas.restoreState()


def build_story() -> list:
    story = []

    # Page 1 - Executive proposition
    story += [Spacer(1, 0.05 * inch), P("EXECUTIVE BRIEF", "Kicker"),
              P(text("//*[@id='brief-title']"), "TitleLarge"),
              P(text("//p[contains(@class,'brief-opening-read')]")),
              Table([[P(text("//p[contains(@class,'brief-forecast-bridge')]"), "Callout")]],
                    colWidths=[6.36 * inch], style=TableStyle([
                        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREEN),
                        ("BOX", (0, 0), (-1, -1), 0.6, GREEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 12),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                        ("TOPPADDING", (0, 0), (-1, -1), 10),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                    ])), Spacer(1, 0.12 * inch)]
    exec_cards = []
    for item in DOC.xpath("//div[contains(@class,'brief-executive-card')]/div"):
        exec_cards.append((clean_text(item.xpath("./span")[0]),
                           clean_text(item.xpath("./strong")[0]),
                           clean_text(item.xpath("./p")[0])))
    story += [three_cards(exec_cards), Spacer(1, 0.12 * inch),
              P(text("//p[contains(@class,'brief-subtitle')]")), Spacer(1, 0.08 * inch)]
    takeaway_title = text("//*[@id='brief-takeaway-title']")
    takeaway_copy = text("//section[contains(@class,'brief-takeaway')]/p[last()]")
    story += [Table([[P("EXECUTIVE TAKEAWAY", "Label")],
                     [P(takeaway_title, "SectionHeading")],
                     [P(takeaway_copy, "BodySmall")]],
                    colWidths=[6.36 * inch], style=TableStyle([
                        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREEN),
                        ("LINEBEFORE", (0, 0), (0, -1), 2.2, GREEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 13),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                        ("TOPPADDING", (0, 0), (-1, -1), 5),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ])), PageBreak()]

    # Page 2 - Why it matters and operating model
    story += [Spacer(1, 0.34 * inch), P("WHY IT MATTERS", "Kicker"),
              P(text("//*[@id='brief-summary-title']"), "PageTitle"),
              *[P(value) for value in texts("//section[contains(@class,'brief-summary-panel')][1]//div[contains(@class,'brief-summary-copy')]/p")],
              Spacer(1, 0.1 * inch), HRFlowable(color=LINE, thickness=0.6), Spacer(1, 0.13 * inch),
              P("OPERATING MODEL", "Kicker"),
              P(text("//*[@id='brief-operating-title']"), "SectionHeading")]
    operating = []
    for item in DOC.xpath("//div[contains(@class,'brief-operating-steps')]/article"):
        operating.append((clean_text(item.xpath("./span")[0]),
                          clean_text(item.xpath("./strong")[0]),
                          clean_text(item.xpath("./p")[0])))
    privacy_title = text("//aside[contains(@class,'brief-privacy-note')]/strong")
    privacy_copy = text("//aside[contains(@class,'brief-privacy-note')]/p")
    story += [Spacer(1, 0.1 * inch), three_cards(operating, row_height=1.36 * inch), Spacer(1, 0.18 * inch),
              Table([[P(privacy_title.upper(), "Label")], [P(privacy_copy, "BodySmall")]],
                    colWidths=[6.36 * inch], style=TableStyle([
                        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREEN),
                        ("LINEBEFORE", (0, 0), (0, -1), 2.2, GREEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 13),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                        ("TOPPADDING", (0, 0), (-1, -1), 5),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ])), PageBreak()]

    # Page 3 - Executive question, interpretation layer, and report
    story += [Spacer(1, 0.05 * inch), P("THE EXECUTIVE QUESTION", "Kicker"),
              P(text("//*[@id='brief-lens-title']"), "PageTitle"),
              P(text("//section[contains(@class,'brief-lens-bridge')]//div[contains(@class,'brief-lens-copy')]/p[last()]"), "BodySmall"),
              Spacer(1, 0.08 * inch)]
    lens_columns = []
    for item in DOC.xpath("//div[contains(@class,'brief-lens-diagram')]/div"):
        children = [clean_text(child) for child in item.xpath("./*")]
        label = children[0] if children else ""
        title = children[1] if len(children) > 1 else ""
        copy = "<br/>".join(children[2:]) if len(children) > 2 else ""
        lens_columns.append((label, title, copy))
    output_sections = DOC.xpath("//section[contains(@class,'brief-output-section')]")[:2]
    interpretation_section, report_section = output_sections
    interpretation_heading = clean_text(interpretation_section.xpath(".//h2")[0])
    interpretation_copy = clean_text(interpretation_section.xpath(".//div[contains(@class,'brief-output-copy')]/p[last()]")[0])
    report_kicker = clean_text(report_section.xpath(".//p[contains(@class,'context')]")[0])
    report_heading = clean_text(report_section.xpath(".//h2")[0])
    report_copy = clean_text(report_section.xpath(".//div[contains(@class,'brief-output-copy')]/p[last()]")[0])
    report_items = []
    for row in report_section.xpath(".//div[contains(@class,'brief-output-list')]/p"):
        label = clean_text(row.xpath("./span")[0])
        full = clean_text(row)
        report_items.append((label, full[len(label):].strip()))
    story += [three_cards(lens_columns, row_height=1.08 * inch), Spacer(1, 0.1 * inch),
              P("WHAT FUSIONEQ AI ADDS", "Kicker"),
              P(interpretation_heading, "SectionHeading"), Spacer(1, 0.08 * inch),
              P(interpretation_copy, "BodySmall"),
              Spacer(1, 0.07 * inch), HRFlowable(color=LINE, thickness=0.6), Spacer(1, 0.09 * inch),
              P(report_kicker.upper(), "Kicker"), P(report_heading, "SectionHeading"),
              Spacer(1, 0.08 * inch), P(report_copy, "BodySmall"),
              label_value_rows(report_items), PageBreak()]

    # Page 4 - Leadership use cases
    story += [Spacer(1, 0.28 * inch), P("WHERE IT HELPS", "Kicker"),
              P("Use FusionEQ AI where forecast confidence needs stronger evidence.", "PageTitle")]
    use_cases = []
    for item in DOC.xpath("//div[contains(@class,'brief-grid')]/section"):
        use_cases.append((clean_text(item.xpath("./span")[0]),
                          clean_text(item.xpath("./h2")[0]),
                          clean_text(item.xpath("./p")[0])))
    story += [two_column_cards(use_cases, row_height=1.64 * inch), PageBreak()]

    # Page 5 - Capability building and executive decision
    story += [Spacer(1, 0.2 * inch), P("CAPABILITY BUILDING", "Kicker"),
              P(text("//*[@id='brief-capability-title']"), "PageTitle"),
              P(text("//section[contains(@class,'brief-capability-panel')]/div[1]/p[last()]"), "BodyCustom")]
    capabilities = []
    for item in DOC.xpath("//div[contains(@class,'brief-capability-grid')]/article"):
        capabilities.append((clean_text(item.xpath("./span")[0]),
                             clean_text(item.xpath("./strong")[0]),
                             clean_text(item.xpath("./p")[0])))
    origin_columns = []
    for item in DOC.xpath("//section[contains(@class,'brief-origin-band')]/div"):
        label = clean_text(item.xpath("./p[contains(@class,'context')]")[0])
        heading = clean_text(item.xpath("./h2")[0])
        copy = " ".join(clean_text(p) for p in item.xpath("./p[not(contains(@class,'context'))]"))
        origin_columns.append((label, heading, copy))
    story += [three_cards(capabilities), Spacer(1, 0.12 * inch),
              Table([[card(*item) for item in origin_columns]], colWidths=[3.18 * inch, 3.18 * inch],
                    style=TableStyle([
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 11),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                        ("TOPPADDING", (0, 0), (-1, -1), 9),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREEN),
                        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                        ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                    ])), Spacer(1, 0.14 * inch),
              P("EXECUTIVE DECISION", "Kicker"),
              P(text("//*[@id='brief-decision-title']"), "SectionHeading")]
    decision_copy = texts("//section[contains(@class,'brief-decision-panel')]//div[contains(@class,'brief-summary-copy')]/p")
    proprietary_notice = (
        "© 2026 FusionEQ AI. All rights reserved. FusionEQ AI™, Situational Deal Assessment™, "
        "Deal Readiness Report™, and Evidence Before Assumptions™ are proprietary marks and "
        "frameworks of FusionEQ AI. No reproduction or derivative use without written permission. "
        "Decision support only; no deal or forecast outcome is guaranteed."
    )
    story += [*[P(value) for value in decision_copy], Spacer(1, 0.12 * inch),
              Table([[P("READY TO TEST AN ACTIVE OPPORTUNITY?", "Label")],
                     [P("Request a Deal Readiness Report", "SectionHeading")],
                     [P("fusioneqai.com/contact.html?request=report", "BodySmall")],
                     [P("Build the judgment behind the read: fusioneqai.com/courses.html", "BodySmall")]],
                    colWidths=[6.36 * inch], style=TableStyle([
                        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GREEN),
                        ("BOX", (0, 0), (-1, -1), 0.6, GREEN),
                        ("LEFTPADDING", (0, 0), (-1, -1), 13),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                        ("TOPPADDING", (0, 0), (-1, -1), 5),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ])), Spacer(1, 0.1 * inch), P(proprietary_notice, "Legal")]
    return story


def build_pdf() -> None:
    doc = SimpleDocTemplate(
        str(PDF_PATH), pagesize=letter,
        rightMargin=0.62 * inch, leftMargin=0.62 * inch,
        topMargin=1.0 * inch, bottomMargin=0.62 * inch,
        title="FusionEQ AI Executive Brief",
        author="FusionEQ AI",
        subject="Enterprise Deal Readiness Intelligence",
    )
    doc.build(build_story(), onFirstPage=header_footer, onLaterPages=header_footer)


def render_pages() -> None:
    pdftoppm = shutil.which("pdftoppm")
    if not pdftoppm:
        raise RuntimeError("pdftoppm is required to render Executive Brief viewer pages")
    temp_prefix = ROOT / "assets" / ".executive-brief-render"
    for stale_render in (ROOT / "assets").glob(".executive-brief-render-*.png"):
        stale_render.unlink()
    subprocess.run([
        pdftoppm, "-png", "-r", "150", str(PDF_PATH), str(temp_prefix)
    ], check=True)
    rendered = sorted((ROOT / "assets").glob(".executive-brief-render-*.png"),
                      key=lambda path: int(path.stem.rsplit("-", 1)[1]))
    if len(rendered) != 5:
        raise RuntimeError(f"Expected 5 rendered pages, found {len(rendered)}")
    for index, source in enumerate(rendered, start=1):
        target = Path(f"{PAGE_PREFIX}-{index}.png")
        source.replace(target)


if __name__ == "__main__":
    build_pdf()
    render_pages()
    print(f"Built {PDF_PATH.relative_to(ROOT)} and 5 viewer page images")
