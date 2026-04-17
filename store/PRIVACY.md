# Privacy Policy — Claude RTL

_Last updated: 2026-04-17_

Claude RTL ("the extension") is a browser extension that applies RTL/LTR text direction to content on `claude.ai`.

## Data collection

**The extension does not collect, store, or transmit any personal data.**

- No analytics, telemetry, or tracking.
- No external network requests.
- No reading, storing, or sharing of message content.

## Local storage

The extension uses `chrome.storage.local` to persist **one boolean value** (`crtl_enabled`) representing whether the RTL feature is toggled on or off. This value never leaves your device.

## Permissions

- `storage` — used exclusively to save the on/off toggle state described above.
- `host_permissions: *://claude.ai/*` — the content script and stylesheet are injected only on `claude.ai` pages to apply text-direction changes. The extension does not read or exfiltrate any page content; it only counts Arabic vs. Latin characters locally in each paragraph to decide the direction.

## Third parties

None. The extension has no dependencies on third-party services.

## Source code

The full source code is available under the MIT license at:
https://github.com/irukhaimi/claude-RTL

## Contact

For questions or concerns, please open an issue at:
https://github.com/irukhaimi/claude-RTL/issues
