# The Order of Small Things

**A daily honour for small, unglamorous victories.**

Name the tiny thing you won today → a deterministic engine awards its **medal** (The Overdue, The Hard Word, The Maker, The Showed-Up, …) → you get a born-to-share crest → and your anonymous medal joins a live map of *what the world quietly won today*.

**▶ Live: https://greymoth-jp.github.io/small-wins/** — installable as an app, works offline.

No win is too small for the Order. That is rather the point.

## Privacy — and it's verifiable

Your words **never leave your device.** The medal is generated entirely in your browser. Adding to the roll is **opt-in** and sends **only** an anonymous medal type + the date — never what you wrote, no account, no cookies, no analytics, no tracking.

Don't take our word for it — **this page is the source.** Read [`index.html`](./index.html) and [`engine.js`](./engine.js): the only outbound request is the opt-in roll call, and its body is exactly `{ archetype, date }`. Nothing else is ever sent.

## How it works

- **`engine.js`** — a deterministic keyword engine maps your win to one of 12 win-archetypes. No AI, no API; same input → same medal.
- The medal is drawn on a `<canvas>` and shared via the device's native share sheet (or downloaded).
- The collective roll is a tiny Cloudflare Worker that stores only `{ date → medal → count }` — never any text.
- An entry mentioning self-harm stays private and surfaces a support link — while *surviving a hard day* is itself celebrated, as **The Showed-Up**.

## Run it yourself

It's a static page — just open `index.html`. For the live collective roll you also need the Worker. MIT licensed.

---
*Made by **greymoth**. No win too small.*
