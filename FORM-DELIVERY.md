# FusionEQ Form Delivery

The website uses two layers for form handling:

1. Netlify Forms remains the source of record for submissions.
2. `/.netlify/functions/form-notification` is an optional direct email layer.

The direct email layer is ready, but it only sends email after these Netlify environment variables are added:

- `RESEND_API_KEY`: API key from Resend.
- `FUSIONEQ_FORM_TO`: comma-separated recipient list. Default: `fusioneqai@gmail.com`.
- `FUSIONEQ_FORM_FROM`: verified sender. Default fallback: `FusionEQ Website <onboarding@resend.dev>`.

If `RESEND_API_KEY` is missing, the function returns success without sending direct email so the visitor is not blocked. Netlify Forms still captures the submission and can still send Netlify-managed notifications.
