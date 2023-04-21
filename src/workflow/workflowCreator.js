const {
  simpleTask,
  switchTask,
  workflow,
} = require("@io-orkes/conductor-javascript")

const {
  COMPLEX_WORKFLOW_NAME,
  GET_USER_INFO,
  SEND_EMAIL,
  SEND_SMS,
} = require("../constants");

const { clientPromise } = require("../client/apiUtil")

async function createAndRegisterWorkflow() {
  return createComplexWorkflow();
}

async function createComplexWorkflow() {
  const wf = workflow(COMPLEX_WORKFLOW_NAME, [
    createGetUserDetailsTask(),
    createEmailOrSmsTask(),
  ]);
  wf.inputParameters = ['userId', 'notificationPref']
  const client = await clientPromise;
  client.metadataResource.create(wf, true);
  return wf;
}

const createGetUserDetailsTask = () => {
  const task = simpleTask(GET_USER_INFO, GET_USER_INFO, {
    userId: "${workflow.input.userId}",
  });
  registerTask(task)
  return task;
}

const createEmailOrSmsTask = () => {
  const task = switchTask("emailorsms", "${workflow.input.notificationPref}", {
    email: [createSendEmailTask()],
    sms: [createSendSmsTask()],
  });
  registerTask(task);
  return task;
}

const createSendEmailTask = () => {
  const task = simpleTask(SEND_EMAIL, SEND_EMAIL, {
    email: "${get_user_info.output.email}",
  });
  registerTask(task);
  return task;
}

const createSendSmsTask = () => {
  const task = simpleTask(SEND_SMS, SEND_SMS, {
    phoneNumber: "${get_user_info.output.phoneNumber}",
  });
  registerTask(task);
  return task;
}

async function registerTask(task) {
  const taskDef = getTaskDefFromTask(task);
  const client = await clientPromise;
  client.metadataResource.registerTaskDef([taskDef]);
}

const getTaskDefFromTask = (task) => {
  return {
    name: task.name,
    ownerEmail: "example@orkes.io",
    timeoutSeconds: 0,
  }
}

module.exports = {
  createAndRegisterWorkflow: createAndRegisterWorkflow
}
