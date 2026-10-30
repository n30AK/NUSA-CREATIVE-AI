# Meta integration decision record

Status: design approved; provider integration is intentionally disabled until legal, account, and backend prerequisites are met.

## Selected product policy

- Connection strategy: **Both**, with two separate lanes.
- Cost policy: **Optional**, with all paid usage disabled by default.
- NUSA's default mode remains local/free-first.
- A provider call must not happen unless the user sees a per-job estimate and explicitly approves that job.
- A configurable spending ceiling, usage ledger, provider kill switch, and auditable consent record are mandatory before production activation.

## Lane A — user-owned Meta account

The consumer Meta AI website session is not an API credential. The reviewed Meta Model API documentation describes signing into the Model API dashboard and creating an API key; it does not document an OAuth authorization flow for a third-party app to link a consumer's existing meta.ai session.

Therefore:
- Do not collect Meta passwords, OTPs, recovery codes, browser cookies, or session tokens.
- Do not automate or scrape the logged-in meta.ai website.
- Do not show this lane as connected based only on matching email addresses.
- Keep this lane marked unavailable until Meta publishes and approves a suitable third-party account-linking flow.

## Lane B — NUSA integrated product using Meta Model API

Official documentation currently describes:
- Base URL: https://api.meta.ai/v1
- Bearer credential: MODEL_API_KEY
- Muse Spark for text/reasoning and agent workflows.
- Muse Image for image generation/editing.
- Muse Voice Transcribe for speech-to-text.
- No general video-generation endpoint is listed in the reviewed model catalogue. NUSA's FFmpeg worker remains a separate local compositor, not Meta video generation.

Implementation constraints:
1. Use a dedicated server-side adapter only for specific NUSA product features. Do not expose the key in browser bundles, public environment variables, logs, or client storage.
2. Do not build a general-purpose Meta model proxy, API gateway, aggregator, standalone model access, or resale product. Meta's terms prohibit third-party access/resale through those patterns unless Meta expressly authorizes it in writing. The terms do permit end users to interface with Meta Materials through an Integrated Product, subject to all terms and policies. Obtain Meta's written clarification/authorization if NUSA's planned multi-user deployment could be interpreted as a gateway or third-party service.
3. Use Standard models by default. Contributor models are excluded from the default design because their discounted pricing is exchanged for permission to use submitted content and responses to train future models.
4. Validate geographic availability and model designation at activation time; Meta can change availability and policy.
5. Add privacy notices, data minimization, user consent, retention controls, and a deletion path before sending product photos, customer data, or other user content to Meta.

## Cost gate

Default configuration:
- META_PROVIDER_ENABLED=false
- META_BILLING_APPROVED=false
- META_MAX_COST_PER_JOB unset (must be explicitly configured)
- No API key required for local/free-first workflows.

Before each paid job:
1. Calculate and show an estimate using current official pricing and expected token/image/audio usage.
2. Show the selected model, data sent, Standard/Contributor designation, and any relevant training/data-use implications.
3. Require a separate affirmative approval for that job.
4. Enforce server-side budget ceiling and record estimate, approval, actual usage, and provider response.
5. Fail closed if consent, price data, budget, credential, or policy checks are missing.
6. Provide an immediate provider kill switch and a way to revoke the API key.

Never treat the UI checkbox or browser-local state as enforceable consent. Consent must be authenticated, persisted server-side, timestamped, scoped to the specific job and price estimate, and revocable.

## Current implementation status

The overview UI now shows both lanes, their current inactive state, and the cost/privacy guardrails. This is explanatory UI only. There is no Meta OAuth, API key, server-side adapter, billing setup, or live Meta request in this commit. No charge can be initiated by this UI.

## Official references reviewed (2026-10-30)

- Terms: https://dev.meta.ai/legal/terms-of-service
- Geographic/model policy: https://dev.meta.ai/legal/geographic-use-policy
- Authentication: https://dev.meta.ai/docs/authentication
- Model catalogue: https://dev.meta.ai/docs/models
- Overview: https://dev.meta.ai/docs/overview
- Pricing and rate limits: https://dev.meta.ai/docs/pricing-rate-limits
- Account sign-in help: https://dev.meta.ai/help/accounts-and-login/log-in
- Supported countries help: https://dev.meta.ai/help/accounts-and-login/supported-countries
