from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "custom-gpt" / "FusionEQ_Deal_Analyzer_Operating_Spec.md"
OUT = ROOT / "custom-gpt" / "FusionEQ_Deal_Analyzer_Operating_Spec.pdf"


def escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("(TM)", "™")
    )


def build_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "FusionTitle",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=colors.HexColor("#111827"),
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "FusionSubtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#667B9B"),
            spaceAfter=18,
        ),
        "h1": ParagraphStyle(
            "FusionH1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#1F2937"),
            spaceBefore=14,
            spaceAfter=7,
        ),
        "h2": ParagraphStyle(
            "FusionH2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            textColor=colors.HexColor("#4F8F3A"),
            spaceBefore=10,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "FusionBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13.2,
            textColor=colors.HexColor("#1F2937"),
            spaceAfter=6,
        ),
        "mono": ParagraphStyle(
            "FusionMono",
            parent=base["Code"],
            fontName="Courier",
            fontSize=8.4,
            leading=11,
            textColor=colors.HexColor("#111827"),
            backColor=colors.HexColor("#F3F4F6"),
            borderPadding=5,
            spaceAfter=7,
        ),
        "bullet": ParagraphStyle(
            "FusionBullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=12.5,
            textColor=colors.HexColor("#1F2937"),
            leftIndent=12,
        ),
    }


def flush_bullets(story, bullets, styles):
    if not bullets:
        return
    items = [
        ListItem(Paragraph(escape(item), styles["bullet"]), leftIndent=10)
        for item in bullets
    ]
    story.append(
        ListFlowable(
            items,
            bulletType="bullet",
            start="circle",
            leftIndent=14,
            bulletFontName="Helvetica",
            bulletFontSize=7,
            bulletColor=colors.HexColor("#4F8F3A"),
        )
    )
    story.append(Spacer(1, 4))
    bullets.clear()


def parse_markdown(text: str):
    styles = build_styles()
    story = [
        Paragraph("FusionEQ Deal Analyzer Operating Spec", styles["title"]),
        Paragraph(
            "Replacement knowledge file for the FusionEQ Deal Analyzer Custom GPT",
            styles["subtitle"],
        ),
    ]
    bullets = []
    in_code = False
    code_lines = []

    skipped_source_subtitle = False
    for raw in text.splitlines():
        line = raw.rstrip()
        if line.startswith("```"):
            if in_code:
                story.append(Paragraph("<br/>".join(map(escape, code_lines)), styles["mono"]))
                code_lines = []
                in_code = False
            else:
                flush_bullets(story, bullets, styles)
                in_code = True
            continue
        if in_code:
            code_lines.append(line)
            continue
        if not line.strip():
            flush_bullets(story, bullets, styles)
            story.append(Spacer(1, 3))
            continue
        if (
            not skipped_source_subtitle
            and line.strip() == "Replacement knowledge file for the FusionEQ Deal Analyzer Custom GPT"
        ):
            skipped_source_subtitle = True
            continue
        if line.startswith("# "):
            flush_bullets(story, bullets, styles)
            title = line[2:].strip()
            if title == "FusionEQ Deal Analyzer Operating Spec":
                continue
            story.append(Paragraph(escape(title), styles["h1"]))
            continue
        if line.startswith("## "):
            flush_bullets(story, bullets, styles)
            story.append(Paragraph(escape(line[3:].strip()), styles["h2"]))
            continue
        if line.startswith("### "):
            flush_bullets(story, bullets, styles)
            story.append(Paragraph(f"<b>{escape(line[4:].strip())}</b>", styles["body"]))
            continue
        if line.startswith("- "):
            bullets.append(line[2:].strip())
            continue
        if line[0:3].strip(".").isdigit() and ". " in line[:5]:
            flush_bullets(story, bullets, styles)
            story.append(Paragraph(escape(line), styles["body"]))
            continue
        flush_bullets(story, bullets, styles)
        body = escape(line)
        body = body.replace("**", "<b>", 1).replace("**", "</b>", 1) if body.count("**") >= 2 else body
        story.append(Paragraph(body, styles["body"]))

    flush_bullets(story, bullets, styles)
    if code_lines:
        story.append(Paragraph("<br/>".join(map(escape, code_lines)), styles["mono"]))
    return story


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#6B7280"))
    canvas.drawString(0.7 * inch, 0.45 * inch, "FusionEQ Deal Analyzer Operating Spec")
    canvas.drawRightString(7.8 * inch, 0.45 * inch, f"Page {doc.page}")
    canvas.restoreState()


def main():
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.72 * inch,
        title="FusionEQ Deal Analyzer Operating Spec",
        author="FusionEQ",
    )
    story = parse_markdown(SRC.read_text())
    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(OUT)


if __name__ == "__main__":
    main()
