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

function createAndRegisterWorkflow() {
  const wf = createComplexWorkflow()
}

const createComplexWorkflow = () => {
  return workflow(COMPLEX_WORKFLOW_NAME, [
    createGetUserDetailsTask(),
    createEmailOrSmsTask(),
  ])
};

const createGetUserDetailsTask = () => {
  return simpleTask(GET_USER_INFO, GET_USER_INFO, {
    userId: "${workflow.input.userId}",
  });
}

const createEmailOrSmsTask = () => {
  return switchTask("emailorsms", "${workflow.input.notificationPref}", {
    email: [createSendEmailTask()],
    sms: [createSendSmsTask()],
  });
}

const createSendEmailTask = () => {
  return simpleTask(SEND_EMAIL, SEND_EMAIL, {
    email: "${get_user_info.output.email}",
  });
}

const createSendSmsTask = () => {
  return simpleTask(SEND_SMS, SEND_SMS, {
    phoneNumber: "${get_user_info.output.phoneNumber}",
  });
}

module.exports = {
  createAndRegisterWorkflow: createAndRegisterWorkflow
}