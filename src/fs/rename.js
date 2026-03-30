import fs from "fs/promises";
import path from "path";

const rename = async () => {
  const folderPath = path.join(process.cwd(), "files");
  const filePath = path.join(folderPath, "wrongFilename.txt");
  const newPath = path.join(folderPath, "properFilename.md");

  try {
    await fs.writeFile(filePath, "content");
    await fs.rename(filePath, newPath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await rename();
