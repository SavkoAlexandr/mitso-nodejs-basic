import fs from "fs";
import path from "path";

const write = async () => {
  const filePath = path.join(process.cwd(), "files", "fileToWrite.txt");

  try {
    await fs.promises.access(path.dirname(filePath));
    const writeStream = fs.createWriteStream(filePath);
    process.stdin.pipe(writeStream);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await write();
