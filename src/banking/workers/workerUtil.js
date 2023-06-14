const { TaskManager } = require("@io-orkes/conductor-javascript");
const { fraudCheckWorker } = require("./workers");

function createTaskRunner(conductorClient) {
  const taskRunner = new TaskManager(conductorClient, [fraudCheckWorker], {
    logger: console,
    options: { pollInterval: 100, concurrency: 1 },
  });
  return taskRunner;
}

module.exports = {
  createTaskRunner
}