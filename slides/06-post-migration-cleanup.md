---
slide: 6
title: Post-migration cleanup suite
---
## On screen
*Section label:* 04 · Scripting toolkit

- **PostEmail-Migration-v3.ps1 / MS-Reg-Wipe.ps1** · "Fresh start" after an email migration · ~1,700–1,950 lines · 48–56 functions
- **Clears:** closes every M365 process · Outlook profiles · OST / NST caches · Autocomplete (backed up first) · Offline address books · Autodiscover cache · New Outlook data · Teams caches · Office sign-in tokens · Licensing cache · Web Account Manager cache · Saved credentials · OneDrive link · Old work-or-school registration
- Time saved vs. by hand · ~45 min by hand → ~5 min (estimate)
- **MS-Reg-Wipe.Tests.ps1** · Pester test suite · 1,283 lines · 110 tests
- **Check-OldTenantLeftovers.ps1** · Report-only, changes nothing: wallpaper & lock-screen policies, Intune enrollments, EnterpriseMgmt tasks, MDM certificates, join status, linked OneDrive
- **Remove-OldEdgePolicies.ps1** · Old homepage & startup policies, current user only
- Version history: Sep 30 "OLDWORKS" → Oct 2 "Updated" → (Linux test run) → Oct 29 "v3"
- Footer: M365 = Microsoft 365 · OST / NST = Outlook offline data files · MDM = Mobile Device Management · Names and paths shown are sanitized: no usernames, client names, or tenant IDs.

## Speaker notes
DELTA also helps me refine my PowerShell. The biggest piece is a post-migration cleanup suite. After an email migration, a PC holds on to the old tenant everywhere: Outlook profiles and caches, Teams caches, Office sign-in tokens, saved credentials, the OneDrive link, even the old work or school registration. The script closes every Microsoft 365 process, backs up autocomplete first, and clears all of it, so the PC behaves like new. It has its own automated test suite, built in Pester. And I've improved it over several versions, starting in September. Alongside it, a report-only checker finds leftover device management and policies without changing anything, and a small script removes the old company's Edge homepage policies for the current user only.

## Placeholders
None
