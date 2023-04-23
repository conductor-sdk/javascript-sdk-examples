const { createAndRegisterWorkflow } = require("./workflow/workflowCreator")
const { createTaskManager } = require("./worker/workerUtil")
const { executeWorkflowAsync } = require("./workflow/workflowUtil")
const { getWorkflowExecutionUrl } = require("./client/apiUtil")

async function main() {
    const wf = await createAndRegisterWorkflow();
    const taskManager = await createTaskManager();
    taskManager.startPolling();
    await runAsync();
    taskManager.stopPolling();
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
