---
title: Faster projects, and the evidence builds itself
---
## On screen
*Section label:* 11 · Scoping now

- Uses: new customer onboarding, new department project, test and training labs, rebuild after an incident, assessor walk-through, drift checks
- CMMC mapping (NIST SP 800-171 Rev. 2): CM 3.4.1, CM 3.4.2 / 3.4.5, CM 3.4.3, SC 3.13.1 / 3.13.2, AU 3.3.1
- First step: one blueprint end to end, for real timing
- Callout: No CUI in it · Secrets pulled at build time, never in the file · Grok helps write modules; no bot sees state, secrets, or CUI

## Speaker notes
So why does this matter? Two reasons: speed, and evidence. On top are the places it gets used. Onboarding a new customer: pick the blueprint, fill in the file, and it's built the same way as the last one, not rebuilt from memory. A new department project gets a tested copy of the baseline instead of a pile of manual setup tickets. Test and training labs: spin up a throwaway copy locally, try a change or train someone, and tear it down, with no cloud bill for practice. If we ever have to rebuild after an incident, the file is the rebuild plan. For an assessor, we can show the baseline as code, every plan, and every approval. And for drift, we just re-run the plan against a live environment, and anything someone changed by hand shows up.

The middle row is the CMMC angle. These are NIST SP 800-171 requirements, the ones behind CMMC Level 2. The module library is our configuration baseline, and the request files are the inventory, that's CM 3.4.1. Hardened settings are in every build, and only the deploy identity can build, 3.4.2 and 3.4.5. Every change is a reviewed file plus an approved plan, so change control, 3.4.3, comes for free. Segmentation and secure design are built in, that's SC 3.13.1 and 3.13.2. And logging is in every blueprint, AU 3.3.1. So the evidence builds itself as we work.

Same rules as everything else today. No CUI in it. Passwords and keys get pulled at build time and are never written in the file. Grok helps me write and review the modules, but no bot ever sees the state files, secrets, or CUI. The first step is one blueprint end to end, the CMMC Level 2 workload, built locally and ported to a test Azure Government subscription, so we get real timing instead of guesses.

## Placeholders
None
