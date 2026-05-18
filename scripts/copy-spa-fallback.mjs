import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const distDir = "dist/client";
const source = join(distDir, "_shell.html");
const targets = [join(distDir, "index.html"), join(distDir, "404.html")];

await mkdir(distDir, { recursive: true });
await Promise.all(targets.map((target) => copyFile(source, target)));
