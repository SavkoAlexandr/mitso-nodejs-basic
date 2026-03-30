import fs from "fs/promises";
import path from "path";

const create = async () => {
  const folderPath = path.join(process.cwd(), "files");
  const filePath = path.join(folderPath, "fresh.txt");
  const content = "I am fresh and young";

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch (mkdirError) {
      if (mkdirError.code !== "EEXIST") {
        throw mkdirError;
      }
    }

    await fs.writeFile(filePath, content, "utf8");
  }
};

await create();
