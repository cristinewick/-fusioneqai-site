# FusionEQ Form Delivery

The website uses three layers for form handling:

1. Netlify Forms remains the source of record for submissions.
2. `/.netlify/functions/form-notification` can create a Notion GTM tracker record.
3. `/.netlify/functions/form-notification` is an optional direct email layer.

## Notion GTM tracker automation

The function can push website form submissions into the FusionEQ GTM Contact + Opportunity Tracker when these Netlify environment variables are added:

- `NOTION_TOKEN`: internal integration token from Notion.
- `NOTION_GTM_DATABASE_ID`: `f81723be0539457cbbf77e3996a2d006`

Notion setup:

1. Create an internal Notion integration.
2. Copy its internal integration token into `NOTION_TOKEN`.
3. Open the FusionEQ GTM Contact + Opportunity Tracker in Notion.
4. Share the tracker database with the integration.
5. Add `NOTION_GTM_DATABASE_ID` in Netlify.
6. Trigger a test form submission from the live site.

Mapped fields:

- `name` -> `Name`
- `company` -> `Company`
- `email` -> `Email`
- `request_type` -> `Trigger Moment` and `Opportunity Type`
- `pipeline_challenge` -> `Decision Question` and `Notes`
- `Source` -> `Website CTA`
- `Status` -> `New Inquiry`
- `Website Email Logged` -> checked
- `Next Action` -> reply and offer a complimentary Deal Readiness Snapshot if there is a live opportunity to read

If the Notion variables are missing, the function still succeeds and Netlify Forms still captures the submission.

## Direct email notification

The direct email layer is ready, but it only sends email after these Netlify environment variables are added:

- `RESEND_API_KEY`: API key from Resend.
- `FUSIONEQ_FORM_TO`: comma-separated recipient list. Default: `cristine@fusioneqai.com`.
- `FUSIONEQ_FORM_FROM`: verified sender. Default fallback: `FusionEQ Website <onboarding@resend.dev>`.

If `RESEND_API_KEY` is missing, the function returns success without sending direct email so the visitor is not blocked. Netlify Forms still captures the submission and can still send Netlify-managed notifications.
