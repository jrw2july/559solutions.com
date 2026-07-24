import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const requiredRuntimeFiles = [
  "msvcp140.dll",
  "vcruntime140.dll",
  "vcruntime140_1.dll",
];

const hasRuntime = (directory) =>
  requiredRuntimeFiles.every((file) => existsSync(path.join(directory, file)));

const findBundledRuntime = () => {
  if (process.platform !== "win32") return "";
  if (hasRuntime("C:\\Windows\\System32")) return "";

  const roots = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application",
    "C:\\Program Files\\Microsoft\\Edge\\Application",
  ];

  for (const root of roots) {
    if (!existsSync(root)) continue;
    const versions = readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    for (const version of versions) {
      const candidate = path.join(root, version);
      if (hasRuntime(candidate)) return candidate;
    }
  }
  return "";
};

export const runtimeEnv = () => {
  const env = { ...process.env };
  const pathKey = Object.keys(env).find((key) => key.toLowerCase() === "path") || "Path";
  const bundledRuntime = findBundledRuntime();
  if (bundledRuntime) {
    env[pathKey] = `${bundledRuntime}${path.delimiter}${env[pathKey] || ""}`;
  }
  return env;
};
