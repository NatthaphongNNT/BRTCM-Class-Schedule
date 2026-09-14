# ZCMU Sujaree 2026 — Class Schedule

## Live China Time
The schedule status uses `Asia/Shanghai` (China Standard Time, UTC+8) via JavaScript `Intl.DateTimeFormat`.

### Status behavior
- More than 15 minutes before class: normal
- Within 15 minutes before class: red blinking
- During class: green
- After class ends: red

### Important: current academic week
Open `script.js` and set:

```js
const LIVE_SETTINGS = {
  timeZone: "Asia/Shanghai",
  currentAcademicWeek: 1,
  warningMinutes: 15,
  tickMs: 1000
};
```

Change `currentAcademicWeek` to the real week number. The timetable source does not provide a semester start date, so the code does not guess the academic week.

## GitHub Pages
Replace the existing `index.html`, `style.css`, `schedule.js`, `script.js`, and `README.md` in the existing repository. Keep `index.html` in the repository root.

The GitHub repository name can remain `BRTCM-Class-Schedule`; the displayed website brand/title is `ZCMU Sujaree 2026`.
