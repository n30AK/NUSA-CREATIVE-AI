# Strict-free provider decision — 30 October 2026

This document supersedes the earlier provider shortlist. User feedback confirms LoreMotion and Movoa do not meet the user's practical definition of free; they are removed from the NUSA UI and are not recommended.

## Required definition

A provider qualifies only if repeated generation does not require payment, subscription, trial conversion, purchased credits, or a recurring daily/monthly credit allowance. A fair-use / anti-abuse policy is not the same as a published credit quota, but it still means no provider can honestly promise unlimited throughput or uptime.

## Text-to-image

### GenFree
- Its current Terms say the service is free without registration, credits, or payment.
- The same Terms explicitly retain reasonable fair-use and security protections; "unlimited" means no fixed daily credit allowance.
- Human verification may be required.
- Status: candidate for manual use, not an unlimited-throughput guarantee.
- Sources: https://genfree.app/ ; https://genfree.app/terms

### FreeImgGen
- Its provider page states no daily generation cap, no credits and no paid tier.
- It also states heavy-use rate limiting, queuing during busy periods, and automatic deletion of generated files after 24 hours.
- Status: candidate for manual use, subject to provider fair-use and retention.
- Source: https://freeimggen.com/

### AI Horde
- Community-funded volunteer compute is a genuine no-payment image-generation model.
- Anonymous requests have lower priority and request limits; queue/worker availability varies. Do not market it as unlimited.
- Status: useful community alternative, not a no-limit guarantee.
- Sources: https://haidra.net/ai-horde/ ; https://status.stablehorde.net/docs/image/

## Image-to-video: no qualifying provider verified

- LoreMotion and Movoa are removed following user feedback that their real access is not free in the way required.
- Flyne AI and Flux AI currently advertise no-credit 480p/5-second MiniMax H3 generations. Their claims were found on provider landing pages, but a full independent verification of billing/access, retention, model source, fair-use, commercial rights and sustained repeat generation has not been completed. They are NOT approved/recommended as a guaranteed free provider or integrated into NUSA.
- CogVideo Online is described as free to start, not proven unlimited; excluded.
- MoveFrame advertises daily free credits; excluded.
- Hugging Face ZeroGPU has free-account daily GPU quotas; excluded.
- Loomance/Wan 2.2 local can avoid cloud credits, but needs NVIDIA RTX GPU with 8GB+ VRAM, 16GB RAM and about 40GB disk. User's current machine (Intel HD 4600, 8GB RAM) is not compatible.
- No verified volunteer-compute platform supporting public, repeatable image-to-video jobs without credits/quotas was found in this audit.

## Hardware reality

The user's current PC has Intel HD Graphics 4600, 8GB RAM and no supported NVIDIA CUDA GPU. Local open image-to-video models such as Wan 2.2 are not practical on this machine. Installing large model files would waste disk space and time; do not attempt it.

## Product changes

- Remove LoreMotion and Movoa from the visible NUSA provider list.
- Keep GenFree and FreeImgGen labelled as no-fixed-credit candidates, with explicit fair-use/retention caveats.
- Show image-to-video as unavailable under the strict-free requirement until a provider passes actual repeat-generation and terms tests.
- Do not build browser automation, scrape private endpoints, or proxy third-party free web interfaces.
- Do not enable any paid endpoint or ask for payment credentials.

## Next viable paths

1. A user-supplied existing GPU machine / community worker that can host an open video model and explicitly share compute under clear terms.
2. A genuinely volunteer-operated video inference network with public API and documented no-credit policy, if one becomes available and can be independently tested.
3. If neither exists, be transparent that strict $0 unlimited image-to-video is unavailable rather than substituting a capped free tier.

Last reviewed: 2026-10-30.
