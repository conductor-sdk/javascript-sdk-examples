const {
    COMPLEX_WORKFLOW_NAME,
} = require("../constants");

const { clientPromise } = require("../client/apiUtil")
const { WorkflowExecutor } = require("@io-orkes/conductor-javascript");

const sleepFor = 5;

async function executeWorkflowAsync() {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
        name: COMPLEX_WORKFLOW_NAME,
        version: 1,
        input: {
            userId: "jim",
            notificationPref: "sms",
        },
    });
    console.log(`Sleep for ${sleepFor} seconds`);
    await new Promise((resolve) =>
        setTimeout(() => {
            console.log(`Awake after ${sleepFor} seconds`);
            resolve();
        }, sleepFor * 1000)
    );
    return await workflowExecutor.getWorkflow(executionId, true);
}

module.exports = {
    executeWorkflowAsync: executeWorkflowAsync
}