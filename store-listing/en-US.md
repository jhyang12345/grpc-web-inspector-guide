# Chrome Web Store listing — English (United States)

## Product name

gRPC Request Inspector

## Summary

Inspect, search, edit, and replay gRPC-Web, Connect-Web, and protobuf-ts requests in Chrome DevTools.

## Detailed description

Debug browser RPC traffic without leaving Chrome DevTools.

gRPC Request Inspector adds a focused network panel for understanding the requests your web application sends through gRPC-Web, Connect-Web, and protobuf-ts clients.

Highlights:

- Capture unary and server-streaming RPC activity as it happens.
- Inspect request JSON, response JSON, stream messages, status, and errors.
- Search payloads and move between matches in large JSON documents.
- Edit a captured unary request and replay it through the original page frame.
- Identify edited replays immediately with an Edited badge and source-request details.
- Diagnose latency with frame URL, backend URL, start time, completion time, duration, time to first message, and message count.
- Keep default-valued protobuf scalar fields visible for Connect-Web and protobuf-ts messages.
- Work in a clear, responsive interface with light and dark themes.
- Recover cleanly from an idle or restarted extension connection.

Replay is intentionally limited to requests the extension has already captured. Sending a replay makes a real backend request and may reuse the captured request's authentication and metadata, so review edited JSON before sending.

Setup guide:
https://github.com/jhyang12345/grpc-web-inspector-guide/blob/main/SETUP.md

Source and issue tracker:
https://github.com/jhyang12345/grpc-web-devtools

## Latest update

This release expands the inspector from passive viewing into an active debugging workflow. You can edit captured unary request JSON and replay it through the original frame, distinguish replayed calls with an Edited badge and provenance, and inspect richer lifecycle metadata including backend URL, start and completion times, duration, TTFM, and message count. Capture support now includes protobuf-ts unary and server-streaming calls, Connect-Web and protobuf-ts retain default-valued scalar fields, and the panel adds dark-mode polish, faster payload search, more resilient reconnect behavior, and bounded handling for replay state and large stream histories.

## Suggested store fields

- Category: Developer Tools
- Language: English (United States)
- Homepage: https://github.com/jhyang12345/grpc-web-devtools
- Support: https://github.com/jhyang12345/grpc-web-devtools/issues

