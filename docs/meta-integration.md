# Meta AI integration — CANCELLED

Decision: Meta AI integration is cancelled for NUSA CREATIVE AI.

Reason: NUSA's primary requirement is image-to-video generation for affiliate product content. The Meta Model API model catalogue reviewed on 2026-10-30 did not document a suitable image-to-video generation endpoint. Meta AI is therefore not a fit for the core production workflow.

Implementation decision:
- No Meta AI user-account connection or OAuth.
- No Meta Model API adapter, API key, provider gateway, or Meta billing integration.
- No Meta credentials or user sessions are to be collected or stored.
- The NUSA product UI does not expose Meta as a provider.
- No Meta API charges have been enabled by this project.

The prior dual-connection and optional-cost proposal is superseded by this cancellation. This file is retained only as an architecture decision record so the cancelled integration is not accidentally reintroduced.

Reconsider only if Meta officially releases and documents an image-to-video API that meets NUSA's requirements and the project owner explicitly approves a new evaluation.
