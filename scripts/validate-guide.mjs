import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const failures = [];

async function read(relativePath) {
  return readFile(path.join(repositoryRoot, relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

async function collectFiles(directory = repositoryRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath));
    else files.push(absolutePath);
  }
  return files;
}

async function validateRepositoryText() {
  const unsupportedBrowser = ["fire", "fox"].join("");
  const files = await collectFiles();
  for (const absolutePath of files) {
    const extension = path.extname(absolutePath).toLowerCase();
    if (![".md", ".ts", ".mjs", ".json", ".yml", ".yaml"].includes(extension)) {
      continue;
    }
    const contents = await readFile(absolutePath, "utf8");
    if (contents.toLowerCase().includes(unsupportedBrowser)) {
      fail(`${path.relative(repositoryRoot, absolutePath)} mentions an unsupported browser release.`);
    }
  }
}

async function validateMarkdown(relativePath) {
  const markdown = await read(relativePath);
  const fenceCount = (markdown.match(/^```/gm) || []).length;
  if (fenceCount % 2 !== 0) fail(`${relativePath} has an unclosed code fence.`);

  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(linkPattern)) {
    const target = match[1];
    if (/^(https?:\/\/|mailto:|#)/.test(target)) continue;
    const fileTarget = decodeURIComponent(target.split("#", 1)[0]);
    const absoluteTarget = path.resolve(
      path.dirname(path.join(repositoryRoot, relativePath)),
      fileTarget
    );
    try {
      if (!(await stat(absoluteTarget)).isFile()) {
        fail(`${relativePath} links to a non-file target: ${target}`);
      }
    } catch {
      fail(`${relativePath} has a missing relative link: ${target}`);
    }
  }
}

function requireSignals(relativePath, source, signals) {
  for (const signal of signals) {
    if (!source.includes(signal)) {
      fail(`${relativePath} is missing required integration signal: ${signal}`);
    }
  }
}

async function validateExamples() {
  const generatedPath = "examples/generated-grpc-web.ts";
  const generated = await read(generatedPath);
  requireSignals(generatedPath, generated, [
    "window.__GRPCWEB_DEVTOOLS__?.(grpcWebClients)",
    "installGrpcWebDevtools();",
    'window.addEventListener("grpc-web-dev-tools-ready"',
    'typeof window !== "undefined"',
  ]);

  const connectPath = "examples/connect-es.ts";
  const connect = await read(connectPath);
  requireSignals(connectPath, connect, [
    "window.__CONNECT_WEB_DEVTOOLS__",
    "devtools ? devtools(next)(request) : next(request)",
    "grpcWebDevtoolsInterceptor",
    "...applicationInterceptors",
  ]);
  if (connect.indexOf("grpcWebDevtoolsInterceptor") > connect.indexOf("...applicationInterceptors")) {
    fail(`${connectPath} must place the Inspector interceptor before application interceptors.`);
  }

  const protobufPath = "examples/protobuf-ts.ts";
  const protobuf = await read(protobufPath);
  requireSignals(protobufPath, protobuf, [
    "window.__GRPCWEB_DEVTOOLS_PROTOBUF_TS__",
    "interceptUnary(next, method, input, options)",
    "interceptServerStreaming(next, method, input, options)",
    "devtools.interceptUnary({ baseUrl, next, method, input, options })",
    "...applicationInterceptors",
  ]);

  const declarationsPath = "examples/grpc-web-devtools.d.ts";
  const declarations = await read(declarationsPath);
  requireSignals(declarationsPath, declarations, [
    "__GRPCWEB_DEVTOOLS__?",
    "__CONNECT_WEB_DEVTOOLS__?",
    "__GRPCWEB_DEVTOOLS_PROTOBUF_TS__?",
  ]);
}

async function validateGuideCoverage() {
  const setup = await read("SETUP.md");
  requireSignals("SETUP.md", setup, [
    "## Generated grpc-web clients",
    "## Connect-ES",
    "## protobuf-ts",
    "## Verify the integration",
    "## Replay safety and limits",
    "## Troubleshooting",
    "Chrome Web Store",
  ]);
}

await validateRepositoryText();
await Promise.all([
  validateMarkdown("README.md"),
  validateMarkdown("SETUP.md"),
  validateMarkdown("TESTING.md"),
]);
await validateExamples();
await validateGuideCoverage();

if (failures.length > 0) {
  console.error("Guide validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Guide validation passed.");
