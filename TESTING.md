# Testing the gRPC-Web Inspector setup guide

A documentation check can prove that links resolve and required integration
patterns are present. It cannot prove that a copied snippet captures a real RPC
or that replay reaches a backend. Test both layers before publishing a guide
update.

## Automated repository checks

Run:

```bash
npm test
```

The dependency-free validator checks that:

- relative Markdown links resolve and code fences are balanced;
- the guide contains setup, verification, replay-safety, and troubleshooting
  sections for every supported client;
- example files retain the required page APIs, readiness handling, unary and
  server-streaming hooks, and interceptor order;
- unsupported browser-release language is absent from published files.

The same command runs in GitHub Actions for every push and pull request.

## Runtime test applications

Maintain one minimal Chrome application for each integration path:

1. a generated `grpc-web` client using `protoc-gen-grpc-web` 1.0.4 or newer;
2. a current Connect-ES application using `@connectrpc/connect-web`;
3. a legacy Connect application using the matching `@bufbuild` packages; and
4. a protobuf-ts application using `@protobuf-ts/grpcweb-transport`.

Each fixture should call a local disposable RPC service with one unary method
and one server-streaming method. Keep authentication, retry, and tracing test
interceptors after the Inspector wrapper so their order can be observed. Do not
use a production backend for replay tests.

## Chrome test setup

1. Build the Inspector extension and load its unpacked build in Chrome.
2. Start the local RPC backend, proxy, and one fixture application.
3. Open Chrome DevTools and select the **gRPC-Web** panel before issuing the RPC.
4. Run every applicable case in the matrix below.
5. Repeat with each fixture and with the oldest and newest dependency versions
   the guide promises to support.

## Runtime test matrix

| Case | Procedure | Pass condition |
| --- | --- | --- |
| Extension absent | Run unary and server-streaming calls without the extension loaded. | Application behavior and responses are unchanged; no Inspector API is required. |
| API already present | Open DevTools before application startup, then issue both calls. | New entries include request, response/messages, status, frame URL, backend URL, and timing. |
| Late extension injection | Start the application before opening DevTools, then open it and issue a fresh call. | Generated clients register through the readiness event; late-bound transport wrappers capture the call without rebuilding the transport. |
| Unary capture | Send a request containing zero/default scalar values. | The complete logical request and unary response appear. |
| Server streaming | Receive several messages and complete the stream. | All retained messages, completion status, duration, and time-to-first-message appear. |
| Safe edited replay | Edit a captured request and send it to the disposable backend. | A real second RPC reaches the backend and a new entry links back to the original. |
| Authentication order | Expire the fixture token before replay and let the auth interceptor refresh it. | Replay passes through the remaining application interceptor pipeline and succeeds with fresh credentials. |
| Generated custom field | Replay a method that needs a method-specific request adapter. | The adapter reconstructs the generated request; invalid values fail clearly instead of being guessed. |
| Multiple clients | Issue calls through every registered client or transport factory. | No active service instance is missing from the panel. |
| Frame navigation | Capture in an iframe, navigate that frame, and try the old replay handle. | The old handle is rejected; a newly captured request can be replayed in the new frame. |
| Idle recovery | Leave the tab idle long enough for the extension worker to suspend, then issue a call. | The bridge reconnects automatically or through **Reconnect**, and the fresh call is captured. |
| SSR build | Build and server-render a fixture with browser globals unavailable. | The build and server render complete without a `window` reference error. |

## Evidence to record

For each fixture and dependency version, record:

- package versions and generated-code version;
- the exact setup file copied from this guide;
- Chrome and extension versions;
- pass/fail for every applicable matrix row;
- screenshots of unary capture, streaming capture, and edited replay; and
- sanitized console output for failures.

Redact authorization values, cookies, request bodies, and service URLs before
attaching evidence to an issue.

## Release gate

Publish guide changes only when `npm test` passes and every supported client
passes extension-absent, API-present, late-injection, unary, server-streaming,
safe replay, and SSR checks. Treat legacy-package coverage and generated custom
field adapters as required whenever the changed instructions affect them.
