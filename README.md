# gRPC-Web Inspector web application guide

Public, copyable setup instructions for connecting a browser application to
the gRPC-Web Inspector extension.

## Start here

Read **[Set up gRPC-Web Inspector in your web application](SETUP.md)**.

No Inspector npm package is required. Your application checks for an optional
API injected by the browser extension and continues to send RPCs normally when
the extension is not installed.

## Supported clients

| Client | Integration | Capture | Edit and replay |
| --- | --- | --- | --- |
| Generated `grpc-web` | Register existing client instances | Unary and server streaming | Yes |
| Connect-ES | Add a late-bound transport interceptor | Unary and server streaming | Yes |
| protobuf-ts | Add a late-bound `RpcInterceptor` | Unary and server streaming | Yes |

Client-streaming and bidirectional-streaming calls are not supported.

## Copyable files

- [Generated grpc-web example](examples/generated-grpc-web.ts)
- [Connect-ES example](examples/connect-es.ts)
- [protobuf-ts example](examples/protobuf-ts.ts)
- [Optional TypeScript declarations](examples/grpc-web-devtools.d.ts)

Replace the example endpoint, generated imports, and existing interceptor list
with values from your application. Do not create a second client or transport
only for the Inspector.

## Install the extension

- [Chrome Web Store](https://chrome.google.com/webstore/detail/grpc-web-developer-tools/kanmilmfkjnoladbbamlclhccicldjaj)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/grpc-web-developer-tools/)

## License

[MIT](LICENSE)
