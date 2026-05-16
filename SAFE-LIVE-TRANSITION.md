# FusionEQ Safe Live Transition

This branch is the new guided intelligence architecture. The original website remains preserved on `main` until Netlify is intentionally switched.

## Current Production-Shaped Path

- `/` -> `index.html` cinematic entry page
- `/home.html` -> guided post-entry orientation
- `/lens.html` -> FusionEQ Lens
- `/patterns.html` -> FusionEQ Patterns
- `/pilot.html` -> Diagnostic Briefing
- `/courses.html` and education pages remain separate intellectual depth

## Preserved Backups On This Branch

- `backups/index-before-entry-migration-20260516.html`
- `backups/home-before-concept-migration-20260516.html`
- `backups/lens-before-concept-migration-20260516.html`
- `backups/patterns-before-concept-migration-20260516.html`

These backups are local safeguards only. The primary safety net remains the untouched `main` branch.

## Pre-Launch Checklist

1. Keep the new architecture on a separate branch until approved.
2. Push this branch to GitHub.
3. Create a Netlify branch deploy for this branch.
4. Review the branch deploy on desktop and mobile:
   - entry page
   - home
   - Lens
   - Patterns
   - Diagnostic Briefing
   - Education
   - contact flow
5. Check every top navigation and footer link.
6. Check all images, videos, and major mobile sections.
7. Confirm the Diagnostic Briefing CTA points to the correct live contact path.
8. Confirm metadata and social previews for the new entry page and home page.
9. Keep `main` unchanged until final approval.
10. Switch Netlify production branch only after the branch deploy is approved.

## Rollback Plan

If anything feels wrong after launch, switch Netlify back to the original production branch. No page-by-page reconstruction should be needed.

## Long-Term Recommendation

Use branch-based production switching, not manual page-by-page migration. It is cleaner, safer, and keeps the original website recoverable while the new FusionEQ experience matures.
