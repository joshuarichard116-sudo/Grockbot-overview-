# Presenter notes

All speaker notes in slide order. In the deck, press **N** to show them under the slide.

## 1. What I built with my Grok Bot seat

Hi, everyone. I'm going to walk you through what I've built with my Grok Bot seat for my S1 work: the daily ticket workflow, the end-of-shift report, scripting, and automation for the enclave.

## 2. Why there's no enclave demo today

First, some context. I got the Grok Bot seat when I moved into CMMC work. That's the Cybersecurity Maturity Model Certification, Level 2. The plan was built around a GCC High enclave. GCC High is Microsoft's Government Community Cloud High. That enclave isn't up and running yet. So I put the seat to work on the job I have right now, and used the time to get ready. All of it carries over once the new tenant is up and running.

## 3. One bot per job

This is the team. Each bot is scoped to one job. DELTA is the lead and runs the CMMC pod: it coordinates the work, writes the ticket and shift reports, helps with scripts, triages email and Teams, and hands work off between the other bots. SENTRY is the CMMC Level 2 pod manager. It tracks practice readiness, controls, and pod oversight. REMY is the GCC High and CMMC Level 2 engineer, and it explains the technical side in plain language. PATCH is my day-to-day help desk partner for MSP (managed service provider) service desk tickets. NETTY is the networking specialist for Cisco, Meraki, UniFi, and FortiGate. RADAR does threat intelligence: Microsoft 365 and GCC High, attacks on MSPs, threats to defense contractors, and the CISA (Cybersecurity and Infrastructure Security Agency) Known Exploited Vulnerabilities list. CHRONO keeps time. It matches RingCentral calls to my MTX tickets and drafts the time entries for me to approve. PELICAN does business development research on contracts and leads for S1. And ACE is my certification coach, working toward the CCA, the Certified CMMC Assessor. Why not one bot? Least privilege. Each one only gets the access its job needs. And they all follow the same rules. Every message is a draft. They're read-only in ConnectWise, the RMM (remote monitoring and management tool), and MTX. And they never hold credentials, client data, or CUI, that's Controlled Unclassified Information. REMY and SENTRY show low usage for one reason: the enclave isn't running yet.

## 4. Ticket and time workflow

Here's the day-to-day workflow. When I start a ticket, DELTA starts a clock. If I'm on a call, CHRONO pulls the call time from RingCentral and matches it to the ticket. It keeps only the last four digits of the number, and it never logs what was said. When I'm done, the note and time entry are already drafted, using rules I wrote down once. Email-only work is ten minutes. Call work is the connected time, plus ten minutes to wrap up. I approve it, and PATCH posts it. Nothing goes out without me. And every thirty minutes on weekdays, I get an alert, but only when someone is waiting on a reply.

## 5. End-of-shift report

At the end of every shift, Grok builds an end-of-shift report for the pod. It reads the ticket board through a read-only API (application programming interface), so it can see the tickets but can't change them. The report sorts the work into four sections: P1 and P2, that's priority one and priority two tickets, then pod maintenance and vendor maintenance. For each ticket, it lists the vendor, a short description, the maintenance window, who's assigned, the estimated completion time, and the status. That helps the pod make sure high-priority tickets are being tracked, and that maintenance gets done within the requested or set maintenance window.

## 6. Post-migration cleanup suite

DELTA also helps me refine my PowerShell. The biggest piece is a post-migration cleanup suite. After an email migration, a PC holds on to the old tenant everywhere: Outlook profiles and caches, Teams caches, Office sign-in tokens, saved credentials, the OneDrive link, even the old work or school registration. The script closes every Microsoft 365 process, backs up autocomplete first, and clears all of it, so the PC behaves like new. It has its own automated test suite, built in Pester. And I've improved it over several versions, starting in September. Alongside it, a report-only checker finds leftover device management and policies without changing anything, and a small script removes the old company's Edge homepage policies for the current user only.

## 7. Everyday Office and endpoint fixes

The rest of the toolkit is everyday fixes. When Outlook won't open attachments, a guided script starts with the least invasive fix and stops as soon as Outlook works. As a last resort, it renames the old profile instead of deleting it. Others reset WebView2 when the old company's sign-in page keeps showing, repair the Teams meeting add-in in classic Outlook, clear printer drivers without touching Microsoft's built-ins, and reinstall Microsoft 365 Apps with a self-elevation check. The time savings on screen are rough estimates for now. I'm still measuring them.

## 8. The CMMC Level 2 Enclave Toolkit

This next one points straight at the enclave: the CMMC Level 2 Enclave Toolkit. Every tool that goes into an enclave holding CUI, that's Controlled Unclassified Information, has to be evaluated the same way, with evidence. So I built a vendor-neutral template with thirteen criteria. Each one maps to the control families in NIST 800-171. That's the National Institute of Standards and Technology. It doesn't recommend vendors or list prices. It just captures the evidence an assessor is going to ask for.

## 9. Automate the busywork. Keep the judgment.

Here's where I want to take this once the enclave is running. The short version: automate the busywork, keep the judgment. First, the ground rule. No CUI, that's Controlled Unclassified Information, gets touched. Grok helps me write these checks, but none of them open, copy, or move CUI, and no CUI ever goes into a bot. Each idea has one bot that owns it, same as today. REMY takes access and sign-in: drafting access reviews and checking that every account has MFA, multifactor authentication. RADAR takes the audit logs and turns them into a short daily summary. PATCH takes configuration drift and patch compliance. SENTRY takes the paperwork side: the POA&M, that's the Plan of Action and Milestones, the freshness of the evidence behind the SSP, the System Security Plan, and a maintenance log. DELTA coordinates and rolls it all into one summary for leadership. Each one lines up with a NIST 800-171 requirement, so the output doubles as evidence. These are proposals. None of them are built yet.

## 10. Same five steps, every time

Every one of these ideas would run the same five steps. It reads settings, logs, and status, read-only. It builds a report inside the enclave, with no CUI in it. The tool drafts a plain-language summary, in a format the owner bot helped design. A person reviews it, and nothing goes out until someone approves it. Then it's filed as evidence for the SSP, the System Security Plan, and for the assessor. All of it runs inside the boundary, on read-only accounts with least privilege, and CUI, Controlled Unclassified Information, never leaves.

## 11. Local tools, built to live inside the enclave

Where does this go? Local tools, built to live inside the enclave. Start small, build each tool once, run it inside the boundary, and let it grow with the department. Local first, so these are small tools running inside, not cloud services reaching in. As the department grows, I'll keep cultivating new ideas and adding to the list. And I'll keep building training alongside it, so the team can run these tools and add their own. The bots draft. People decide. CUI, Controlled Unclassified Information, stays put.

## One JSON file. A whole environment.

Now something I'm scoping right now, and I think it's one of the biggest things we can do for the enclave. I'm calling it the Enclave Cloud Builder. Here's the problem it solves. As the department grows and we take on more customers, every new project needs its own environment: a network, servers, access, logging, encryption. Right now that means someone builds it by hand, and the more customers we have, the faster we have to turn those out. Doing it by hand doesn't scale, and no two hand-built environments come out exactly the same.

So the idea is a Terraform application. Terraform is an infrastructure-as-code tool: you describe what you want in a file, and it builds it. Terraform reads JSON, JavaScript Object Notation, natively. So each project gets one short JSON file, like the one on the right, and I write it. Project name, which blueprint, the network range, how many servers of each role, and the security baseline: MFA, logging, encryption, no public IPs. That's it. The builder takes that file and builds the whole environment out of a library of approved, already-hardened building blocks.

And here's the part I want you to remember. We build it locally first, inside the enclave, and test it there. When it's right, we change one line, the target, from local to azure-gov, and the same file builds the same environment in Azure Government. And notice what's not in that file: no CUI, no passwords, no customer data. It describes infrastructure, nothing else. To be clear, this is in scoping. It's not built yet.

## Built inside. Approved. Then ported.

Here's how a project would flow. Six steps, the same every time. One, I fill in the JSON request myself. Two, the builder validates it: a schema check, so every required field is there and every value is allowed, and policy checks, like no public IPs on servers, encryption on, logging on, approved regions only. A bad request fails right there, before anything gets built. Three, the builder turns the request into Terraform and runs a plan. The plan lists every single thing it's going to create, change, or delete, and a person reads it and approves it. Nothing gets built without that. Four, it builds locally inside the enclave. Five, automated tests confirm the environment matches the baseline, and the plan, the test results, and the file change are saved together as evidence. Six, port to Azure: same file, the target changes to Azure Government, a new plan gets reviewed and approved by a person, and then it's built in the customer's subscription.

On the bottom is what it's made of. Everything that builds lives inside the enclave: the request files in version control, the builder app, the library of hardened modules, each with a local version and an Azure version behind the same inputs, a local mirror of Terraform and its providers so it works with no internet access, the state files, which we treat as sensitive and keep locked inside, and the local sandbox. The only thing that goes to Azure is an approved plan. And because the enclave is a GCC High environment, it can talk to Azure Government directly, so the plan deploys straight from my machine in the enclave. No exporting files, no carrying anything across by hand. It’s deployed by an identity that can only touch its own scope.

If someone asks whether it can really run Azure locally: not Azure itself. The local build is a working copy of the same design, the networks, segmentation, servers, access, and logging, on the enclave's own infrastructure. Azure-only services are checked in the plan before anything is deployed.

## Faster projects, and the evidence builds itself

So why does this matter? Two reasons: speed, and evidence. On top are the places it gets used. Onboarding a new customer: pick the blueprint, fill in the file, and it's built the same way as the last one, not rebuilt from memory. A new department project gets a tested copy of the baseline instead of a pile of manual setup tickets. Test and training labs: spin up a throwaway copy locally, try a change or train someone, and tear it down, with no cloud bill for practice. If we ever have to rebuild after an incident, the file is the rebuild plan. For an assessor, we can show the baseline as code, every plan, and every approval. And for drift, we just re-run the plan against a live environment, and anything someone changed by hand shows up.

The middle row is the CMMC angle. These are NIST SP 800-171 requirements, the ones behind CMMC Level 2. The module library is our configuration baseline, and the request files are the inventory, that's CM 3.4.1. Hardened settings are in every build, and only the deploy identity can build, 3.4.2 and 3.4.5. Every change is a reviewed file plus an approved plan, so change control, 3.4.3, comes for free. Segmentation and secure design are built in, that's SC 3.13.1 and 3.13.2. And logging is in every blueprint, AU 3.3.1. So the evidence builds itself as we work.

Same rules as everything else today. No CUI in it. Passwords and keys get pulled at build time and are never written in the file. Grok helps me write and review the modules, but no bot ever sees the state files, secrets, or CUI. The first step is one blueprint end to end, the CMMC Level 2 workload, built locally and ported to a test Azure Government subscription, so we get real timing instead of guesses.

## 12. What carries into the enclave

So, what carries into the enclave? Maintenance already has the ticket clock, the time rules, and SENTRY's maintenance board. Tool decisions have the toolkit. New environments come from the cloud builder: one JSON file, built and tested inside, then ported to Azure. Inside the enclave, AI (artificial intelligence) helps build small tools, like evidence collectors and read-only configuration checks. The tools run inside the boundary, and CUI never leaves it. The rules don't change, either. No client data or CUI goes into a bot. Every message is a draft. And I press Send. Next, I'm timing one control family end to end, so you'll get real numbers instead of estimates.

## 13. Questions

That's the overview. Thanks for your time. Happy to take questions.


# Added Nov 25: local machines and skills

## The local machines

So where do these tools actually run? Not in the cloud, and not in a bot. They run on a few local machines inside the enclave. A tool runner handles the scheduled checks, and nobody signs in to it day to day. An admin workstation is where someone runs a check on demand, reads the results, and signs off on reviews. And a test and training machine is where new tools get tried first, and where the team practices. No bot runs on these machines, and no bot connects to them. Here's how a tool gets there. Grok helps me write it outside the enclave, using made-up sample data, so there's no CUI, Controlled Unclassified Information, involved. A person reads every line and tests it on the test machine. It goes in through change control, approved and logged. Then it runs inside, on a schedule or on demand, with a read-only account. And the results stay inside, saved as evidence, and a person acts on them.

## Use cases

Here's what that looks like week to week. Every weekday before the shift, a morning check summarizes yesterday's sign-ins, admin changes, and any gaps in logging, on one page. On the first business day of the month, there's a draft access review for the manager to check and sign. A week after Microsoft's monthly patches, a report lists the machines still missing updates, oldest first. Right after a maintenance window closes, every machine gets re-checked against the approved baseline. When someone joins or leaves, the tool confirms the account has only what the role needs and has MFA, multifactor authentication, or that it's fully disabled on the last day. If something looks wrong, an admin can pull failed sign-ins and recent admin changes for one account, fast, and a person decides what happens next. About thirty days before an assessment, it shows which evidence behind the SSP, the System Security Plan, is stale, and which POA&M items are overdue. And the test machine is where the team practices and where new versions get proven. Every one of these reads settings, logs, and status only. The results stay on the local machines, and no CUI goes into any bot.

## Skill: Dress It Up

Next, skills. A skill is a saved playbook for an AI assistant. It says when to use it, what to ask, what to do, and what it must never do. I built these with Claude. The first is Dress It Up. It started as my Pizzazz style kit. It takes a plain page or document and makes it look finished, in your style. First it asks a few questions: who's reading it, light or dark, the mood you want, any colors you have to use, how much flash, and a page you like. Then it builds a style profile, with colors checked so they're readable, and it saves that, so your next page matches. Then it applies the look, formatting only. And last, it proves nothing changed: it compares the text before and after and checks every link, and you approve it. It never changes facts, numbers, names, or commands, and when it runs on its own, it opens a pull request, so nothing goes live until someone merges it.

## Scripting skills

And two scripting skills. The first gives the tech one command to paste, instead of right-clicking and choosing Run as administrator. It relaunches the script elevated and keeps the window open, so you can see the progress and any errors. It always reminds the tech that Windows still asks once, to save open work first, and not to close the window mid-run. Every deployed fix runs this way. The second is the runbook pattern. Each fix script is saved with its runbook: when to use it, what to check first, how to launch it, how to confirm it worked, and what to tell the user. The goal is that every proven fix gets one, so the script lab becomes a team library. No client names, credentials, or CUI go into any of them.
