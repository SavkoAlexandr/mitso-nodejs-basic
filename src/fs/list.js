import fs from "fs/promises";
import path from "path";

const list = async () => {
  const folderPath = path.join(process.cwd(), "files");

  try {
    await fs.access(folderPath);
    const files = await fs.readdir(folderPath);
    console.log(files);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await list();
