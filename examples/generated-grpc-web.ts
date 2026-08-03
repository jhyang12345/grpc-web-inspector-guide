import { EchoServiceClient } from "../generated/EchoServiceClientPb";

// Reuse the application's actual endpoint and existing client instances.
export const echoClient = new EchoServiceClient("https://api.example.com");
const grpcWebClients = [echoClient];

function installGrpcWebDevtools(): void {
  if (typeof window === "undefined") return;
  window.__GRPCWEB_DEVTOOLS__?.(grpcWebClients);
}

if (typeof window !== "undefined") {
  // Covers an extension API that is already available.
  installGrpcWebDevtools();

  // Covers extension injection that finishes after application startup.
  window.addEventListener("grpc-web-dev-tools-ready", installGrpcWebDevtools);
}
