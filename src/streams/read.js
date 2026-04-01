import fs from "fs";
import path from "path";

const read = async () => {
  const filePath = path.join(process.cwd(), "files", "fileToRead.txt");

  try {
    await fs.promises.access(filePath);
    const readStream = fs.createReadStream(filePath, "utf8");
    readStream.pipe(process.stdout);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await read();
