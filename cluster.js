import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

console.log("the total number of cpus is ", cpuCount);
console.log("primary pid=", process.pid);
cluster.setupPrimary({
  exec: __dirname + "/no-cluster.js",
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log(`starting another worker`);
  cluster.fork();
});
