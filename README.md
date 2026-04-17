# Claude RTL

A tiny browser extension that makes [claude.ai](https://claude.ai) read naturally
in right-to-left languages (Arabic, Hebrew-range scripts via `dir="rtl"`).
Each paragraph is auto-aligned based on the **majority** of its characters,
not just the first strong one — so a paragraph that starts with `JavaScript`
and continues in Arabic still flows right-to-left.

- ~50 lines of JavaScript, ~12 lines of CSS.
- No tracking. Only `storage` permission. No background script.
- Works on `claude.ai` and `claude.ai/code`.
- Toggle on/off from the popup.

## Install (from source)

```bash
git clone https://github.com/<you>/claude-RTL.git
cd claude-RTL
bash scripts/build.sh
```

### Chrome / Edge / Brave

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Choose the `dist/chromium/` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Choose `dist/firefox/manifest.json`

> Temporary add-ons disappear on Firefox restart. For a permanent install you
> need to sign the extension via [AMO](https://addons.mozilla.org).

## How it works

The extension uses a small `MutationObserver` to watch the chat DOM. For every
block-level text element (`p`, `li`, `h1`–`h6`, `blockquote`, `td`, `th`, …)
it counts Arabic vs. Latin characters and sets `dir="rtl"` or `dir="ltr"`
accordingly. A short CSS file then aligns each direction:

```css
html.crtl-on [dir="rtl"] { text-align: right !important; }
html.crtl-on [dir="ltr"] { text-align: left  !important; }

html.crtl-on :is(pre, code, kbd, samp, pre *, code *) {
  direction: ltr !important;
  text-align: left !important;
  unicode-bidi: isolate !important;
}
```

Code blocks (`<pre>`, `<code>`) are forced to LTR and bidi-isolated, so an
inline `console.log("hi")` inside an Arabic sentence keeps its shape and the
surrounding text still flows naturally.

The on/off state lives in `chrome.storage.local` under `crtl_enabled`. The
popup just flips that boolean; the content script reacts via
`chrome.storage.onChanged` and either applies or fully cleans up the `dir`
attributes it added.

## Project layout

```
shared/        # All extension code (CSS, JS, popup, icons)
chromium/      # Chromium MV3 manifest
firefox/       # Firefox MV3 manifest (browser_specific_settings.gecko)
scripts/       # build.sh — copies shared/ + manifest into dist/<browser>/
dist/          # Build output (gitignored)
```

## Why another RTL extension?

Existing RTL extensions for Claude do the job, but most ship hundreds of lines
of JavaScript, request broad permissions, and align by first-strong-character
(which mis-aligns paragraphs that begin with an English word). This one is
deliberately minimal:

| | Existing extensions | Claude RTL |
|---|---|---|
| JS lines | 200–800 | ~50 |
| Permissions | `activeTab`, `scripting`, `tabs` | `storage` |
| Background script | usually | none |
| Mixed paragraph (`JavaScript هي لغة …`) | often LTR | RTL (majority count) |

## Contributing

Issues and PRs welcome. Keep changes small and dependency-free — the whole
point is that this extension stays under a few KB.

## License

[MIT](./LICENSE)
