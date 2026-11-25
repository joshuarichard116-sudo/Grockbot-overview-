---
title: Built inside. Approved. Then ported.
---
## On screen
*Section label:* 11 · Scoping now

- Six steps: Request (fill in the JSON) · Validate (schema and policy checks) · Plan (person approves) · Build locally (inside the enclave) · Test and record (saved as evidence) · Port to Azure (same file, new target; person approves)
- Inside the enclave: request files, builder app, module library (local and Azure versions), provider mirror (works offline), locked state (never in a bot), local sandbox
- Person approves the plan, then Azure Government: customer subscription, same tested baseline, least-privilege deploy identity

## Speaker notes
Here's how a project would flow. Six steps, the same every time. One, someone fills in the JSON request. Two, the builder validates it: a schema check, so every required field is there and every value is allowed, and policy checks, like no public IPs on servers, encryption on, logging on, approved regions only. A bad request fails right there, before anything gets built. Three, the builder turns the request into Terraform and runs a plan. The plan lists every single thing it's going to create, change, or delete, and a person reads it and approves it. Nothing gets built without that. Four, it builds locally inside the enclave. Five, automated tests confirm the environment matches the baseline, and the plan, the test results, and the file change are saved together as evidence. Six, port to Azure: same file, the target changes to Azure Government, a new plan gets reviewed and approved by a person, and then it's built in the customer's subscription.

On the bottom is what it's made of. Everything that builds lives inside the enclave: the request files in version control, the builder app, the library of hardened modules, each with a local version and an Azure version behind the same inputs, a local mirror of Terraform and its providers so it works with no internet access, the state files, which we treat as sensitive and keep locked inside, and the local sandbox. The only thing that crosses over to Azure is an approved plan, deployed by an identity that can only touch its own scope.

If someone asks whether it can really run Azure locally: not Azure itself. The local build is a working copy of the same design, the networks, segmentation, servers, access, and logging, on the enclave's own infrastructure. Azure-only services are checked in the plan before anything is deployed.

## Placeholders
None
