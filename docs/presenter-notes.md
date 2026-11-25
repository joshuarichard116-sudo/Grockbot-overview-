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

## 12. What carries into the enclave

So, what carries into the enclave? Maintenance already has the ticket clock, the time rules, and SENTRY's maintenance board. Tool decisions have the toolkit. Inside the enclave, AI (artificial intelligence) helps build small tools, like evidence collectors and read-only configuration checks. The tools run inside the boundary, and CUI never leaves it. The rules don't change, either. No client data or CUI goes into a bot. Every message is a draft. And I press Send. Next, I'm timing one control family end to end, so you'll get real numbers instead of estimates.

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
