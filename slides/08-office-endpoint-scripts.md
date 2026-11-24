---
slide: 8
title: Everyday Office and endpoint fixes
---
## On screen
*Section label:* 06 · Scripting toolkit

- **Outlook-Wont-Open-PDF-Excel-Docs.ps1** · [JOSHUA: manual vs script minutes] · Least to most invasive, stops when Outlook works. Old profile renamed, never deleted. · 577 lines, 15 functions
- **Reset-WebView2.ps1** · [JOSHUA: manual vs script minutes] · Reinstalls WebView2, clears Office sign-in caches. Fixes the old sign-in page still showing.
- **Fix-TeamsOutlookAddin.ps1** · [JOSHUA: manual vs script minutes] · Repairs the Teams Meeting add-in in classic Outlook
- **Reset-PrinterDrivers.ps1** · [JOSHUA: manual vs script minutes] · Clears spooler, printers, ports, drivers. Never touches Microsoft built-ins.
- **Reinstall-M365Apps.ps1** · [JOSHUA: manual vs script minutes] · Self-elevation check, logging, verifies activation. Saved as a shared runbook skill.
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
The rest of the toolkit is everyday fixes. When Outlook won't open attachments, a guided script starts with the least invasive fix and stops as soon as Outlook works. As a last resort, it renames the old profile instead of deleting it. Others reset WebView2 when the old company's sign-in page keeps showing, repair the Teams meeting add-in in classic Outlook, clear printer drivers without touching Microsoft's built-ins, and reinstall Microsoft 365 Apps with a self-elevation check. The time each script saves over doing it by hand is still being measured.

## Placeholders
- [JOSHUA: manual vs script minutes] (Outlook attachments)
- [JOSHUA: manual vs script minutes] (WebView2)
- [JOSHUA: manual vs script minutes] (Teams add-in)
- [JOSHUA: manual vs script minutes] (printer drivers)
- [JOSHUA: manual vs script minutes] (Microsoft 365 Apps reinstall)
