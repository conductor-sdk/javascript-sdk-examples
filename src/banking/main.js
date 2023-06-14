const {
  orkesConductorClient,
  WorkflowExecutor,
} = require("@io-orkes/conductor-javascript");

const { createTaskRunner } = require("./workers/workerUtil");

const config = {
  keyId: process.env.KEY,
  keySecret: process.env.SECRET,
  serverUrl: process.env.SERVER_URL,
};
async function runWorkflow(client, workflowName, workflowVersion) {
  const workflowExecutor = new WorkflowExecutor(client);
  return workflowExecutor.executeWorkflow(
    {
      name: workflowName,
      version: workflowVersion,
      input: {
        accountId: "1234",
        amount: 1000,
      },
    },
    workflowName,
    1,
    "myRequest"
  );
}

async function main() {
  const name = process.env.WORKFLOW_NAME;
  const version = process.env.WORKFLOW_VERSION || 1;
  if (!name || !version) {
    throw new Error("Workflow name or version not provided");
  }
  const client = await orkesConductorClient(config);
  const taskRunner = createTaskRunner(client);
  taskRunner.startPolling();
  await runWorkflow(client, name, Number(version));
  taskRunner.stopPolling();
}

main();
