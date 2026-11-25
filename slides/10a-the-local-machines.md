---
title: A few local machines, inside the boundary
---
## On screen
- The tools don't live in the cloud or in a bot. They run on a small set of locked-down machines inside the enclave. No bot runs on them, and no bot connects to them.
- Tool runner
- Runs the scheduled checks overnight and early morning. Nobody signs in to it day to day.
- Admin workstation
- Where an admin runs a check on demand, reads the results, and signs reviews.
- Test and training machine
- Where new tools and updates are tried first, and where the team practices.
- 1
- Build outside
- Grok helps write it, using made-up sample data. No CUI.
- 2
- A person reviews
- Every line read, tested on the test machine.
- 3
- Change control
- Approved and logged before it goes in.
- 4
- Runs inside
- On a schedule or on demand, read-only account.
- 5
- Results stay inside
- Saved as evidence. A person acts on them.
- CUI
- = Controlled Unclassified Information ·
- Proposed, not built yet

## Speaker notes
So where do these tools actually run? Not in the cloud, and not in a bot. They run on a few local machines inside the enclave. A tool runner handles the scheduled checks, and nobody signs in to it day to day. An admin workstation is where someone runs a check on demand, reads the results, and signs off on reviews. And a test and training machine is where new tools get tried first, and where the team practices. No bot runs on these machines, and no bot connects to them. Here's how a tool gets there. Grok helps me write it outside the enclave, using made-up sample data, so there's no CUI, Controlled Unclassified Information, involved. A person reads every line and tests it on the test machine. It goes in through change control, approved and logged. Then it runs inside, on a schedule or on demand, with a read-only account. And the results stay inside, saved as evidence, and a person acts on them.

## Placeholders
None
