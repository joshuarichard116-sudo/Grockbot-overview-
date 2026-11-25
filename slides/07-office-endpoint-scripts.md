---
slide: 7
title: Everyday Office and endpoint fixes
---
## On screen
*Section label:* 05 · Scripting toolkit

- **Outlook-Wont-Open-PDF-Excel-Docs.ps1** · ~30 min by hand → ~5 min (estimate) · Least to most invasive, stops when Outlook works. Old profile renamed, never deleted. · 577 lines, 15 functions
- **Reset-WebView2.ps1** · ~20 min by hand → ~3 min (estimate) · Reinstalls WebView2, clears Office sign-in caches. Fixes the old sign-in page still showing.
- **Fix-TeamsOutlookAddin.ps1** · ~15 min by hand → ~2 min (estimate) · Repairs the Teams Meeting add-in in classic Outlook
- **Reset-PrinterDrivers.ps1** · ~30 min by hand → ~5 min (estimate) · Clears spooler, printers, ports, drivers. Never touches Microsoft built-ins.
- **Reinstall-M365Apps.ps1** · ~45 min by hand → ~15 min (estimate) · Self-elevation check, logging, verifies activation. Saved as a shared runbook skill.
- **AD Connect delta sync** · `Start-ADSyncSyncCycle -PolicyType Delta`
- Code sample:

```powershell
# Reinstall-M365Apps: run elevated, bypass for this process only
Start-Process powershell -Verb RunAs -ArgumentList `
  '-ExecutionPolicy','Bypass','-File',
  'C:\Users\<username>\Downloads\Reinstall-M365Apps.ps1'
```

- Footer: M365 = Microsoft 365 · AD = Active Directory · Paths are sanitized.

## Speaker notes
The rest of the toolkit is everyday fixes. When Outlook won't open attachments, a guided script starts with the least invasive fix and stops as soon as Outlook works. As a last resort, it renames the old profile instead of deleting it. Others reset WebView2 when the old company's sign-in page keeps showing, repair the Teams meeting add-in in classic Outlook, clear printer drivers without touching Microsoft's built-ins, and reinstall Microsoft 365 Apps with a self-elevation check. The time savings on screen are rough estimates for now. I'm still measuring them.

## Placeholders
None
