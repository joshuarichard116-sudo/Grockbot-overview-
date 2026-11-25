---
slide: after 11 (the vision)
title: From the sandbox to a customer's FortiGate
---
## On screen
*Section label:* 10 · Where this goes

- A config built and tested in the Talvex lab can carry over to a real customer FortiGate. Three ways to move it:
- **Full config restore** · True one-for-one copy. Only on the same model and the same FortiOS version.
- **CLI script** · Export just the policies, addresses and VPNs. Edit names and IPs, then paste in. The usual way across models.
- **FortiManager / FortiConverter** · Templates and policy packages with per-site variables. Cleanest for many customers.
- Callout: Always per site: hostname, IPs, interfaces, VPN peers, certificates. Encrypted secrets (VPN keys, passwords) usually need re-entering.
- **Porting it safely:** back up first · customer approval + maintenance window · reviewed CLI script, not a full restore · test on a matching model and FortiOS · apply in small steps, check traffic · console access + backup ready to roll back
- Next: an "Export as FortiOS CLI" button in the lab. Planned, not built yet.
- Footer: FortiOS = the FortiGate operating system · CLI = command-line interface · VPN = virtual private network · IP = Internet Protocol address

## Speaker notes
See docs/presenter-notes.md, "From the sandbox to a customer's FortiGate".

## Placeholders
None
