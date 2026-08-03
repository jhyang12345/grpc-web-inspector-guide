import type { Interceptor } from "@connectrpc/connect";
import type {
  MethodInfo,
  NextServerStreamingFn,
  NextUnaryFn,
  RpcOptions,
  ServerStreamingCall,
  UnaryCall,
} from "@protobuf-ts/runtime-rpc";

type GrpcWebReplayAdapter = {
  fromJson?: (
    json: Record<string, unknown>,
    originalRequest: unknown
  ) => unknown;
  createRequest?: (
    json: Record<string, unknown>,
    originalRequest: unknown
  ) => unknown;
};

type GrpcWebDevtools = ((clients: unknown[]) => void) & {
  registerMethod(method: string, adapter: GrpcWebReplayAdapter): void;
  unregisterMethod(method: string): void;
};

type ProtobufTsDevtools = {
  protocolVersion: 1;
  interceptUnary(context: {
    baseUrl: string;
    next: NextUnaryFn;
    method: MethodInfo;
    input: object;
    options: RpcOptions;
  }): UnaryCall;
  interceptServerStreaming(context: {
    baseUrl: string;
    next: NextServerStreamingFn;
    method: MethodInfo;
    input: object;
    options: RpcOptions;
  }): ServerStreamingCall;
};

declare global {
  interface Window {
    __GRPCWEB_DEVTOOLS__?: GrpcWebDevtools;
    __CONNECT_WEB_DEVTOOLS__?: Interceptor;
    __GRPCWEB_DEVTOOLS_PROTOBUF_TS__?: ProtobufTsDevtools;
  }
}

export {};
