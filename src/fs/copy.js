import fs from "fs/promises";
import path from "path";

const copy = async () => {
  const sourceFolder = path.join(process.cwd(), "files");
  const destFile = path.join(sourceFolder, "files_copy.txt");

  try {
    await fs.access(sourceFolder);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await fs.access(destFile);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  const files = await fs.readdir(sourceFolder);
  let allContent = "";

  for (const file of files) {
    if (file === "files_copy.txt") continue;

    const filePath = path.join(sourceFolder, file);
    const stat = await fs.stat(filePath);
    if (stat.isFile()) {
      const content = await fs.readFile(filePath, "utf8");
      allContent += `=== ${file} ===\n${content}\n\n`;
    }
  }

  await fs.writeFile(destFile, allContent, "utf8");
};

await copy();
