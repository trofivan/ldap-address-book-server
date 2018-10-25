import cluster from 'cluster';
import path from 'path';
import os from 'os';
import config from 'config'

const workerRestartTimeout = config.get('cluster.workerRestartTimeout');
const numCPUs = os.cpus().length;
const pathToApp = path.join(__dirname, 'app.js');

console.log(`Master pid=${process.pid} is running.`);

// Configure Master process
cluster.setupMaster({ exec: pathToApp });

// Fork workers on each CPU core
for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on('listening', (worker) => console.log(`Worker pid=${worker.process.pid} is connected.`));

cluster.on('fork', (worker) => console.log(`Worker pid=${worker.process.pid} is forked.`));

// Restart worker with timeout if die
cluster.on('exit', (worker, code, signal) => {
  console.error(`Worker pid=${worker.process.pid} is die. Code: ${code || signal}. Restarting after ${workerRestartTimeout}ms...`);

  setTimeout(() => {
    cluster.fork()
  }, workerRestartTimeout);
});
