# Presenter notes

All speaker notes in slide order. In the deck, press **N** to show them under the slide.

## 1. What I built with my Grok Bot seat

Hi, everyone. I'm going to walk you through what I've built with my Grok Bot seat for my S1 work: the daily ticket workflow, documentation, scripting, and what carries into the enclave.

## 2. Why there's no enclave demo today

First, some context. I got the Grok Bot seat when I moved into CMMC work. That's the Cybersecurity Maturity Model Certification, Level 2. The plan was built around a GCC High enclave. GCC High is Microsoft's Government Community Cloud High. That enclave isn't up and running yet. So I put the seat to work on the job I have right now, and used the time to get ready. All of it carries over once the new tenant is up and running.

## 3. One bot per job

This is the team. Each bot is scoped to one job. DELTA is the coordinator: it routes the work, raises the alerts, and writes the drafts. PATCH runs help desk tickets and IT Glue. CHRONO keeps time from phone calls. On the compliance side, REMY does GCC High engineering and SENTRY runs the CMMC maintenance board. Why not one bot? Least privilege. Each one only gets the access its job needs. REMY and SENTRY show low usage for one reason: the enclave isn't running yet.

## 4. Ticket and time workflow

Here's the day-to-day workflow. When I start a ticket, DELTA starts a clock. If I'm on a call, CHRONO pulls the call time from RingCentral and matches it to the ticket. It keeps only the last four digits of the number, and it never logs what was said. When I'm done, the note and time entry are already drafted, using rules I wrote down once. Email-only work is ten minutes. Call work is the connected time, plus ten minutes to wrap up. I approve it, and PATCH posts it. Nothing goes out without me. And every thirty minutes on weekdays, I get an alert, but only when someone is waiting on a reply.

## 5. IT Glue documentation

Next, documentation. I had seven client organizations assigned to me in IT Glue, with forty onboarding and provisioning steps still unchecked. PATCH started by finding an existing example, showed it to me first, and matched that format. After that, it drafted the onboarding docs on read-only access, one client at a time, so nothing crosses over. Every draft passed the team's IT Glue styling check, a skill from Hunter's library, with zero errors. I review each one and bring it in myself.

## 6. Post-migration cleanup suite

DELTA also helps me refine my PowerShell. The biggest piece is a post-migration cleanup suite. After an email migration, a PC holds on to the old tenant everywhere: Outlook profiles and caches, Teams caches, Office sign-in tokens, saved credentials, the OneDrive link, even the old work or school registration. The script closes every Microsoft 365 process, backs up autocomplete first, and clears all of it, so the PC behaves like new. It has its own automated test suite, built in Pester. And I've improved it over several versions, starting in September. Alongside it, a report-only checker finds leftover device management and policies without changing anything, and a small script removes the old company's Edge homepage policies for the current user only.

## 7. Everyday Office and endpoint fixes

The rest of the toolkit is everyday fixes. When Outlook won't open attachments, a guided script starts with the least invasive fix and stops as soon as Outlook works. As a last resort, it renames the old profile instead of deleting it. Others reset WebView2 when the old company's sign-in page keeps showing, repair the Teams meeting add-in in classic Outlook, clear printer drivers without touching Microsoft's built-ins, and reinstall Microsoft 365 Apps with a self-elevation check. The time each script saves over doing it by hand is still being measured.

## 8. FortiGate training

On the networking side, here are the FortiGate training resources. That's Fortinet's official training, plus the reference articles for FortiGate-to-Azure VPN (virtual private network) tunnels that come up in our tickets. The links are in the repo.

- Fortinet Training Institute (course catalog): https://training.fortinet.com/
- Fortinet training and certification overview: https://www.fortinet.com/training-certification
- Fortinet training for cybersecurity professionals: https://www.fortinet.com/training/cybersecurity-professionals
- Site-to-site VPN between an Azure virtual network gateway and FortiGate: https://community.fortinet.com/fortigate-3/technical-tip-deploying-s2s-vpn-between-microsoft-azure-virtual-network-gateway-and-fortigate-117984
- BGP (Border Gateway Protocol) over an Azure VNet (virtual network) VPN: https://community.fortinet.com/fortigate-3/technical-tip-bgp-over-an-azure-vnet-vpn-103398
- IPsec VPN DPD (Dead Peer Detection) options and idle tunnel flushing: https://community.fortinet.com/fortigate-3/technical-tip-explanation-of-ipsec-vpn-dpd-options-and-on-idle-tunnel-flushing-process-137398

## 9. The CMMC Level 2 Enclave Toolkit

This next one points straight at the enclave: the CMMC Level 2 Enclave Toolkit. Every tool that goes into an enclave holding CUI, that's Controlled Unclassified Information, has to be evaluated the same way, with evidence. So I built a vendor-neutral template with thirteen criteria. Each one maps to the control families in NIST 800-171. That's the National Institute of Standards and Technology. It doesn't recommend vendors or list prices. It just captures the evidence an assessor is going to ask for.

## 10. What carries into the enclave

So, what carries into the enclave? Maintenance already has the ticket clock, the time rules, and SENTRY's maintenance board. Documentation has the IT Glue pattern. Tool decisions have the toolkit. Inside the enclave, AI (artificial intelligence) helps build small tools, like evidence collectors and read-only configuration checks. The tools run inside the boundary, and CUI never leaves it. The rules don't change, either. No client data or CUI goes into a bot. Every message is a draft. And I press Send. Next, I'm timing one control family end to end, so you'll get real numbers instead of estimates.

## 11. Questions

That's the overview. Thanks for your time. Happy to take questions.
