# Change log and open questions

Slide numbers in items 1 to 14 are from before the end-of-shift slide was added (item 15).

## Changes from the v4 deck, and why

1. **Slide titles tightened.** Slide 3 "Bots, each scoped to one job" became "One bot per job". Slide 7 "Office and endpoint scripts" became "Everyday Office and endpoint fixes". The rest kept their titles. Shorter titles read from the back of the room.
2. **One layout system for every slide.** Section label, big title, content, and an acronym footer. Fixed 1920×1080 canvas that scales to any screen, dark background, body text at least about 22px at full size, and amber for placeholders only.
3. **Acronyms spelled out in a footer on each slide where they appear**, instead of inline. The on-screen lines stay short, and the rule (spell out on first use) still holds on every slide. Added footers that weren't in v4: slide 3, slide 7 (M365, AD), slide 8 (VPN, BGP, VNet, IPsec, DPD), slide 10 (NIST SP, AI, CUI).
4. **Slide 6:** the long "Clears" sentence became 14 short chips. The version history became a small timeline. No items were removed.
5. **Slide 7:** each script is one row with its placeholder on the right, so all five `[JOSHUA: manual vs script minutes]` line up.
6. **Slide 8 built new** from your section 4 links. Short labels on screen (each one clickable), full URLs in the speaker notes and README. No course names, numbers, or certification levels added.
7. **Slide 3 usage:** shown as bars with the exact v4 percentages (52%, 19%, 3%). Not recalculated.
8. **Speaker notes:** your wording, with two small additions for the acronym rule. Slide 8 now says "VPN (virtual private network)" and slide 10 says "AI (artificial intelligence)". Nothing else changed.
9. **Slide 9:** no toolkit location shown, so the `[JOSHUA: where the toolkit lives for S1]` placeholder isn't on screen. It's listed in `docs/placeholders.md`.
10. **Deck features:** arrow keys, Space, Page Up/Down, N for notes, F for full screen, click arrows, swipe on touch screens, `#N` slide links, a progress bar, and print to PDF (one slide per page).
11. **Search engines:** every page has `noindex, nofollow` so it won't show up in Google or Bing. A robots.txt wouldn't help, because GitHub only reads one at the root of your whole github.io site, not inside this project.
12. **Repo layout:** the repo is `grockbot-overview-`, so the handoff's `grok-bot-show-and-tell/` contents sit at the repo root. A root `index.html` forwards to `deck/`.
13. **Not added:** `LICENSE` (your call), `.github/workflows/pages.yml` (Pages serves from `main` directly, so a workflow isn't needed), images (none uploaded), and the old narration audio.
14. **Slide 1 (Nov 24, at your request):** took out the "Lead Engineer, CMMC & GCC High · S1 Technology" line, and the same title in the README. Slide 11 still says "Joshua Richard · S1 Technology".
15. **New slide 5, End-of-shift report (Nov 24, at your request):** how Grok uses read-only API access to the ticket board to build the CMMC End of Shift Report at the end of every shift. It shows the four sections and eight columns only. There are no ticket rows, no screenshot, and no SharePoint link, because the site is public. Slides 5 to 11 moved to 6 to 12.
16. **Slide 3 roster updated (Nov 24, from your list):** nine work bots, in your chain of command, with their roles and full names. Added the shared rules card (drafts only; read-only in ConnectWise, the RMM, and MTX; no credentials, client data, or CUI; least privilege). ACE is new. FORGE is left off because it's personal. Usage percentages are unchanged. Notes rewritten to match.
17. **Bot avatars on slide 3 (Nov 24, at your request):** cropped from your screenshot and embedded, so the deck still works offline. SENTRY and REMY were added from a second screenshot.
18. **New scrolling page (Nov 24, at your request):** the site's home page is now a scrolling page with every section of the talk, a new light, colorful style (violet, teal, and coral; different from the Talvex lab), and line icons only. The slides still live at `/deck/`.
19. **Script lab:** a simulated PowerShell console for each script, labeled "Built with Grok". It types the command, streams verbose lines and progress bars, supports dry run (`-WhatIf`), and ends with a summary. It's marked as a simulation. The steps come from your talk notes. Source and download turn on once the real `.ps1` files are in `scripts/`.
20. **SENTRY and REMY avatars** added from your second screenshot.
21. **Talvex Firewall Lab link (Nov 24, at your request):** added as the first FortiGate training resource on the page, slide 9, the notes, and the README. The Fortinet links stay. This is the one personal link in the repo, added because you asked for it.
22. **Page brought to life:** DELTA at the center of an orbit of the other bots, a rotating "Grok drafts the ..." line, a moving guardrails ribbon, sections that slide in as you scroll, counting numbers, filling usage bars, and a highlight that follows the cursor on cards. Motion turns off for anyone whose device asks for reduced motion. All animation is flat (2D), with no 3D layers or filters.
23. **Placeholders filled with estimates (Nov 24, at your request):** every `[JOSHUA: ...]` is replaced. The bot count is 9, time saved uses rough estimates marked "est.", and the control-family timing has a target date of Dec 19, 2026. The full list is in `docs/placeholders.md`.
24. **Fake PC in the script lab (Nov 24, at your request):** each script now has a simulated Windows screen next to the console. It shows the problem first (Outlook stuck on the old company, an attachment that won't open, the old sign-in page, the missing Teams Meeting button, a jammed print queue, "Unlicensed Product", and so on). A full run wipes in the fixed screen. A dry run leaves it broken. The leftovers checker only shows a report, because it changes nothing. Screens are examples with placeholder names (`oldcompany.example`, `newcompany.example`).
25. **Automation ideas for the enclave (Nov 24, at your request):** a new section 08 with eight proposed tools, each labeled as a proposal and mapped to a NIST SP 800-171 requirement: access review drafts, MFA coverage, audit log summary, configuration drift, patch compliance, POA&M tracker, SSP evidence freshness, and a maintenance log. You can filter by area and pick one to see how it would flow: read, build the report, draft, a person reviews, file as evidence. No numbers and no vendor picks. Go-live is now section 09.
26. **Interactive background:** a faint dot grid behind the page that leans toward the mouse. It's flat (2D canvas), only redraws while the mouse moves, and is off on touch screens and for reduced motion.
27. **Clickable fake PC (Nov 25, at your request):** buttons on the simulated screen work. Before the fix, Retry, Try again, Activate, the attachment, and the rest reproduce the error, with a shake and a message. After a full run, Connect, Next, Open, Teams Meeting, and Add device show it working.
28. **More interactive page:** a scroll progress line under the top bar. Cards lift on hover. Click a bot (or a bot in the hero orbit, which pauses on hover) to highlight it. The step flows have a "Play the steps" button and clickable steps. "Simulate the end of a shift" fills the report with rows clearly marked EXAMPLE. Stats count again on hover. The guardrails ribbon pauses on hover. The go-live date shows a live countdown, worked out from today's date. The background dots are stronger, glow around the cursor, and ripple when you click empty space.
29. **Dark mode:** a toggle in the top bar. It follows your system setting until you pick one, then remembers your choice in that browser.
30. **Section 08 as a presentation (Nov 25, at your request):** the automation ideas are now a step-through presentation on the page (arrows, dots, arrow keys, swipe, and a Present button for full screen). Its slides are the opener ("Automate the busywork. Keep the judgment."), a no-CUI notice, who owns what, one slide per owner bot, how it flows, and the vision of local tools inside the enclave. Owners: REMY (access review, MFA), RADAR (audit logs), PATCH (config drift, patch compliance), SENTRY (POA&M, SSP evidence, maintenance log), and DELTA coordinating. The deck has three matching slides (11 to 13) with speaker notes, so it's now 15 slides.

## Open questions

1. **License:** which one do you want, or none? None means all rights reserved.
2. **Estimates:** check the time-saved estimates and the Dec 19 target date in `docs/placeholders.md`, and swap in real numbers when you have them.
3. **Hunter (slide 5):** the repo is public. Is it OK to name a coworker, or should it say "the team's skill library"?
4. **RingCentral (slide 4):** is it fine to name the phone vendor publicly?
5. **Slide 3 usage:** the percentages counted the personal bots too. Do you want a note like "share of all bot usage" so nobody adds them up and gets less than 100?
6. **End-of-shift screenshot:** your screenshot only has EXAMPLE rows, but it shows your name and two vendor names. Do you want it on slide 5, or keep the column layout only?
7. **ACE:** it's a certification coach for your CCA. Keep it as work, or drop it like FORGE?
8. **MTX:** what does it stand for? It's the only acronym on slide 3 I couldn't spell out.
9. **Script files:** upload the S1 `.ps1` files and your NinjaOne scripts from this week. I'll sanitize them, add them to the Source tab, and set up an automatic Pester test run on GitHub.
10. **Enclave ideas:** are any of the eight already in place, or ones you don't want shown? I can mark them "in place" or remove them.
11. **Bot owners for the enclave ideas:** I picked REMY, RADAR, PATCH, and SENTRY based on their roles. Swap any you'd assign differently.
12. **Where the repo lives:** you mentioned an S1 Technology account. Moving it changes the live URL.
