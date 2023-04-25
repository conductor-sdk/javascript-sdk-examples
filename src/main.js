const { createAndRegisterWorkflow } = require("./workflow/workflowCreator")
const { createTaskManager } = require("./worker/workerUtil")
const {
    executeWorkflowSync,
    executeWorkflowAsync,
} = require("./workflow/workflowUtil")
const { getWorkflowExecutionUrl } = require("./client/apiUtil")

async function main() {
    const wf = await createAndRegisterWorkflow();
    const taskManager = await createTaskManager();
    taskManager.startPolling();
    await runSync();
    await runAsync();
    taskManager.stopPolling();
}

async function runSync() {
    const workflowRun = await executeWorkflowSync();
    if (workflowRun.status != 'COMPLETED') {
        throw new Error(`workflow not completed, workflowId: ${workflowRun.workflowId}`);
    }
    console.log();
    console.log("=======================================================================================");
    console.log("Workflow Execution Completed");
    console.log(`Workflow Id: ${workflowRun.workflowId}`);
    console.log(`Workflow Status: ${workflowRun.status}`);
    console.log(`Workflow Output: ${workflowRun.output}`);
    console.log(`Workflow Execution Flow UI: ${getWorkflowExecutionUrl(workflowRun.workflowId)}`);
    console.log("=======================================================================================");
}

async function runAsync() {
    const workflowStatus = await executeWorkflowAsync();
    if (workflowStatus.status != 'COMPLETED') {
        throw new Error(`workflow not completed, workflowId: ${workflowStatus.workflowId}`);
    }
    console.log();
    console.log("=======================================================================================");
    console.log("Workflow Execution Completed");
    console.log(`Workflow Id: ${workflowStatus.workflowId}`);
    console.log(`Workflow Status: ${workflowStatus.status}`);
    console.log(`Workflow Output: ${workflowStatus.output}`);
    console.log(`Workflow Execution Flow UI: ${getWorkflowExecutionUrl(workflowStatus.workflowId)}`);
    console.log("=======================================================================================");
}

main()
