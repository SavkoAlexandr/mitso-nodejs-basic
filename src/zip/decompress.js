import fs from "fs";
import zlib from "zlib";
import path from "path";

const decompress = async () => {
  const sourcePath = path.join(process.cwd(), "files", "archive.gz");
  const destPath = path.join(process.cwd(), "files", "fileToCompress.txt");

  try {
    await fs.promises.access(sourcePath);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await decompress();
