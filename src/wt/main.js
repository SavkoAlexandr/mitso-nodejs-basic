import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(path.join(__dirname, "worker.js"));
    const startNumber = 10 + i;

    workers.push(
      new Promise((resolve) => {
        worker.on("message", (data) => {
          resolve({ status: "resolved", data });
        });

        worker.on("error", () => {
          resolve({ status: "error", data: null });
        });

        worker.postMessage(startNumber);
      }),
    );
  }

  const allResults = await Promise.all(workers);
  console.log(allResults);
};

await performCalculations();
