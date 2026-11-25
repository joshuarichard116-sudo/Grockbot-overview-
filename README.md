# Grok Bot Show & Tell

How I use my Grok Bot seat for S1 Technology work: the daily ticket and time workflow, the end-of-shift report, PowerShell scripting, and proposed automation for the CMMC (Cybersecurity Maturity Model Certification) enclave.

**Talk:** Wednesday, Nov 25, 2026, 11:40 AM CT (Central Time)
**Presenter:** Joshua Richard

## View the deck

- **Page (with the script lab):** https://joshuarichard116-sudo.github.io/Grockbot-overview-/
- **Slides for the talk:** https://joshuarichard116-sudo.github.io/Grockbot-overview-/deck/
- **Offline:** download the repo and open `deck/index.html` in any browser. It's one file with no internet needed.

| Key | Does |
|---|---|
| → / Space / Page Down | Next slide |
| ← / Page Up | Previous slide |
| N | Show or hide speaker notes |
| F | Full screen |
| Home / End | First / last slide |

Add `#5` to the URL to jump to slide 5. Add `?notes` to open with notes showing.

## What's here

| Path | What |
|---|---|
| `index.html` | The scrolling page: every section of the talk plus the script lab (simulated PowerShell console beside a simulated PC that shows the problem and the fix) and the proposed enclave automation ideas |
| `deck/index.html` | The slide deck (plain HTML, CSS, JavaScript; no build step) |
| `slides/` | One markdown file per slide: on-screen text, speaker notes, placeholders |
| `docs/presenter-notes.md` | All speaker notes in order |
| `docs/placeholders.md` | The rough estimates used in place of placeholders, to replace with measured numbers |
| `docs/acronyms.md` | Acronym glossary |
| `assets/img/` | Screenshots, if added later |

## Script lab

The page has a simulated PowerShell console for each S1 script, all built with Grok. PowerShell can't run in a browser, so the console plays back each script's real steps with example wording, in dry run (`-WhatIf`) or full run. When the sanitized `.ps1` files are added to `scripts/`, the Source tab shows them with copy and download buttons.

## Ground rules

- Bots only draft. Nothing goes out without me.
- No client data or CUI (Controlled Unclassified Information) in any bot.
- Names and paths are sanitized. No client names, usernames, tenant IDs, or credentials.

## License

Not chosen yet.
