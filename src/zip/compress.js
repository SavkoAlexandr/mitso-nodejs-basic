import fs from "fs";
import zlib from "zlib";
import path from "path";

const compress = async () => {
  const sourcePath = path.join(process.cwd(), "files", "fileToCompress.txt");
  const destPath = path.join(process.cwd(), "files", "archive.gz");

  try {
    await fs.promises.access(sourcePath);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await compress();
