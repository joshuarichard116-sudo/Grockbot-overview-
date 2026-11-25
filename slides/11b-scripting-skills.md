---
title: Scripting skills
---
## On screen
- Run a script as admin
- One pasteable command instead of right-click, Run as administrator. It relaunches elevated and stays open, so errors stay visible.
- Start-Process powershell -Verb RunAs -ArgumentList '-NoExit','-ExecutionPolicy','Bypass','-File','<path>.ps1'
- Always tells the tech: Windows still asks once, save open work first, don't close the window mid-run.
- Script runbooks
- Each fix script is saved with its runbook, so anyone on the team runs it the same way.
- When to use it and when not to · checks to run first · the launch command · how to confirm it worked · what to tell the user
- Least invasive step first. Logging on. Rename instead of delete.
- No client names, credentials, or CUI in any skill · Names and paths are sanitized
- CUI
- = Controlled Unclassified Information

## Speaker notes
And two scripting skills. The first gives the tech one command to paste, instead of right-clicking and choosing Run as administrator. It relaunches the script elevated and keeps the window open, so you can see the progress and any errors. It always reminds the tech that Windows still asks once, to save open work first, and not to close the window mid-run. Every deployed fix runs this way. The second is the runbook pattern. Each fix script is saved with its runbook: when to use it, what to check first, how to launch it, how to confirm it worked, and what to tell the user. The goal is that every proven fix gets one, so the script lab becomes a team library. No client names, credentials, or CUI go into any of them.

## Placeholders
None
