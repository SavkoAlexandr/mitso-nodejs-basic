import { access } from "fs";
import fs from "fs/promises";
import path, { join } from "path";

const remove = async () => {
  const folderPath = path.join(process.cwd(), "files");
  const filePath = path.join(folderPath, "fileToRemove.txt");

  try {
    await access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await remove();
