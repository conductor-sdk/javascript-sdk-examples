import {
  simpleTask,
  workflow,
  switchTask,
} from "@io-orkes/conductor-javascript";

import {
  GET_USER_INFO,
  SEND_EMAIL,
  SEND_SMS,
  EMAIL_SEND_WORKFLOW,
  EMAIL_SEND_WORKFLOW_COMPLEX
} from "./constants";

const getUserinfoSimpleTask = simpleTask("get_user_info", GET_USER_INFO, {
  userId: "${workflow.input.userId}",
});
const sendEmailSimpleTask = simpleTask("send_email", SEND_EMAIL, {
  email: "${get_user_info.output.email}",
});

const sendSMSSimpleTask = simpleTask("send_sms", SEND_SMS, {
  phoneNumber: "${get_user_info.output.phoneNumber}",
});

export const createSimpleWorkflow = () => {
  const wf = workflow(EMAIL_SEND_WORKFLOW, [
    getUserinfoSimpleTask,
    sendEmailSimpleTask,
  ]);
  return wf;
};

export const createComplexWf = () => {
  const switchOrSMS = switchTask(
    "emailOrSms",
    "${workflow.input.notificationPref}",
    { email: [sendEmailSimpleTask], sms: [sendSMSSimpleTask] }
  );
  return workflow(EMAIL_SEND_WORKFLOW_COMPLEX, [
    getUserinfoSimpleTask,
    switchOrSMS,
  ]);
};
