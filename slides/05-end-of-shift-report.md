---
slide: 5
title: End-of-shift report
---
## On screen
*Section label:* 03 · Day to day

1. **Read-only access** · Grok reads the ticket board through a read-only API
2. **End of every shift** · Grok builds the report
3. **One list for the pod** · CMMC End of Shift Report, a Microsoft List

**Sections:** P1 · P2 · Pod Maintenance · Vendor Maintenance

**Columns:** Ticket Number · Section · Vendor Name · Description · Maintenance Window · Personnel Assigned · Est Completion Time · Status

- **Why:** High-priority tickets stay tracked. Maintenance finishes within the requested or set maintenance window.
- Footer: API = application programming interface · P1 / P2 = Priority 1 / Priority 2 · CMMC = Cybersecurity Maturity Model Certification

![Screenshot: CMMC End of Shift Report](assets/img/end-of-shift.png) (not added; the deck shows the column layout only, with no ticket rows)

## Speaker notes
At the end of every shift, Grok builds an end-of-shift report for the pod. It reads the ticket board through a read-only API (application programming interface), so it can see the tickets but can't change them. The report sorts the work into four sections: P1 and P2, that's priority one and priority two tickets, then pod maintenance and vendor maintenance. For each ticket, it lists the vendor, a short description, the maintenance window, who's assigned, the estimated completion time, and the status. That helps the pod make sure high-priority tickets are being tracked, and that maintenance gets done within the requested or set maintenance window.

## Placeholders
None
