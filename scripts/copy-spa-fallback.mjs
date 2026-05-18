import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const distDir = "dist";
const source = join(distDir, "_shell.html");
const target = join(distDir, "404.html");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
