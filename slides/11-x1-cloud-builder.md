---
title: One JSON file. A whole environment.
---
## On screen
*Section label:* 11 · Scoping now

- **The pressure** · More departments and more customers means more projects, and each one needs an environment before work can start.
- **The idea** · A Terraform app. Describe the environment once in JSON. It builds the whole thing from approved, hardened building blocks.
- **The payoff** · Build and test it locally inside the enclave. Change one line, and the same file builds it in Azure Government.
- Example `project.json` (project, blueprint, target local or azure-gov, network, servers, baseline). Example file. No CUI, no passwords, no customer data.
- Badge: Scoping · not built yet

## Speaker notes
Now something I'm scoping right now, and I think it's one of the biggest things we can do for the enclave. I'm calling it the Enclave Cloud Builder. Here's the problem it solves. As the department grows and we take on more customers, every new project needs its own environment: a network, servers, access, logging, encryption. Right now that means someone builds it by hand, and the more customers we have, the faster we have to turn those out. Doing it by hand doesn't scale, and no two hand-built environments come out exactly the same.

So the idea is a Terraform application. Terraform is an infrastructure-as-code tool: you describe what you want in a file, and it builds it. Terraform reads JSON, JavaScript Object Notation, natively. So each project gets one short JSON file, like the one on the right. Project name, which blueprint, the network range, how many servers of each role, and the security baseline: MFA, logging, encryption, no public IPs. That's it. The builder takes that file and builds the whole environment out of a library of approved, already-hardened building blocks.

And here's the part I want you to remember. We build it locally first, inside the enclave, and test it there. When it's right, we change one line, the target, from local to azure-gov, and the same file builds the same environment in Azure Government. And notice what's not in that file: no CUI, no passwords, no customer data. It describes infrastructure, nothing else. To be clear, this is in scoping. It's not built yet.

## Placeholders
None
