import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import type { RpcInterceptor } from "@protobuf-ts/runtime-rpc";

const baseUrl = "https://api.example.com";

const grpcWebDevtoolsInterceptor: RpcInterceptor = {
  interceptUnary(next, method, input, options) {
    const devtools = typeof window === "undefined"
      ? undefined
      : window.__GRPCWEB_DEVTOOLS_PROTOBUF_TS__;
    return devtools
      ? devtools.interceptUnary({ baseUrl, next, method, input, options })
      : next(method, input, options);
  },

  interceptServerStreaming(next, method, input, options) {
    const devtools = typeof window === "undefined"
      ? undefined
      : window.__GRPCWEB_DEVTOOLS_PROTOBUF_TS__;
    return devtools
      ? devtools.interceptServerStreaming({
          baseUrl,
          next,
          method,
          input,
          options,
        })
      : next(method, input, options);
  },
};

// Keep the application's current interceptors in their existing order.
const applicationInterceptors: RpcInterceptor[] = [];

export const transport = new GrpcWebFetchTransport({
  baseUrl,
  interceptors: [
    grpcWebDevtoolsInterceptor,
    ...applicationInterceptors,
  ],
});
