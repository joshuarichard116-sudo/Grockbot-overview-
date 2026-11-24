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

## Open questions

1. **License:** which one do you want, or none? None means all rights reserved.
2. **Bot count (slide 1):** slide 3 lists 8 work bots. Is 8 the number for `[JOSHUA: number of work bots]`? I left the placeholder in, as you asked.
3. **Hunter (slide 5):** the repo is public. Is it OK to name a coworker, or should it say "the team's skill library"?
4. **RingCentral (slide 4):** is it fine to name the phone vendor publicly?
5. **Slide 3 usage:** the percentages counted the personal bots too. Do you want a note like "share of all bot usage" so nobody adds them up and gets less than 100?
6. **End-of-shift screenshot:** your screenshot only has EXAMPLE rows, but it shows your name and two vendor names. Do you want it on slide 5, or keep the column layout only?
7. **Where the repo lives:** you mentioned an S1 Technology account. Moving it changes the live URL.
