import type { Interceptor } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

const grpcWebDevtoolsInterceptor: Interceptor = (next) => (request) => {
  const devtools = typeof window === "undefined"
    ? undefined
    : window.__CONNECT_WEB_DEVTOOLS__;
  return devtools ? devtools(next)(request) : next(request);
};

// Keep the application's current interceptors in their existing order.
const applicationInterceptors: Interceptor[] = [];

export const transport = createGrpcWebTransport({
  baseUrl: "https://api.example.com",
  interceptors: [
    grpcWebDevtoolsInterceptor,
    ...applicationInterceptors,
  ],
});

// The same wrapper also works with createConnectTransport(). Legacy projects
// can keep equivalent imports from @bufbuild/connect and @bufbuild/connect-web.
