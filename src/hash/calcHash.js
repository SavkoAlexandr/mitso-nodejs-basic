import fs from "fs/promises";
import crypto from "crypto";
import path from "path";

const calculateHash = async () => {
  const filePath = path.join(
    process.cwd(),
    "files",
    "fileToCalculateHashFor.txt",
  );

  try {
    const content = await fs.readFile(filePath);
    const hash = crypto.createHash("sha256").update(content).digest("hex");
    console.log(hash);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await calculateHash();
