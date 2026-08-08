# Screenshot plan

All screenshots are store-compliant 1280 × 800 PNGs, full bleed, with square corners. Each image shows the inspector at a realistic 620 × 800 right-docked DevTools width beside a neutral 660 × 800 example application. Metadata details remain collapsed so the request and response payloads have more usable space. The UI is populated with deterministic fictional data; no credentials, tokens, or production endpoints are shown.

## 01 — Inspect every RPC at a glance

- File: `screenshots/01-overview-light.png`
- Store caption: **Inspect every RPC at a glance**
- Supporting line: Filter calls, compare status and latency, then inspect request and response JSON side by side.
- UI state: light theme; `GetProjectMetrics` selected; request list includes gRPC-Web, Connect-Web, and protobuf-ts calls.
- Evidence: request list, status, elapsed time, request payload, response payload.

## 02 — Edit and replay captured requests

- File: `screenshots/02-edit-replay.png`
- Store caption: **Edit and replay captured requests**
- Supporting line: Adjust captured unary JSON, review it, and send the request through its original page frame.
- UI state: request editor open; safety note visible; Format, Reset, Cancel, and Send request controls visible.
- Evidence: editor state and replay controls from the current product.

## 03 — Inspect complete server responses

- File: `screenshots/03-response-details.png`
- Store caption: **Inspect complete server responses**
- Supporting line: Expand structured response data and review every retained value without leaving DevTools.
- UI state: completed `SearchTraces` unary call selected; Metadata details collapsed.
- Evidence: structured response payload, nested trace values, and completed unary call.

## 04 — Follow server streams message by message

- File: `screenshots/04-stream-messages.png`
- Store caption: **Follow server streams message by message**
- Supporting line: Inspect retained protobuf-ts stream messages with message counts and time to first message.
- UI state: protobuf-ts server stream selected; individual messages visible.
- Evidence: protobuf-ts transport, `server_streaming` method type, stream message history.

## 05 — Keep context in light or dark mode

- File: `screenshots/05-dark-edited-replay.png`
- Store caption: **Keep context in light or dark mode**
- Supporting line: Spot edited replays and complete protobuf values in a polished dark DevTools workspace.
- UI state: dark theme; edited replay selected; Edited badge and replay provenance visible; default-valued fields visible.
- Evidence: dark mode, replay provenance, Connect-Web/protobuf-ts default scalar fields.
