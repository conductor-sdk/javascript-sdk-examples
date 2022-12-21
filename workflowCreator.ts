import {
  simpleTask,
  workflow,
  switchTask,
} from "@io-orkes/conductor-typescript";

const getUserinfoSimpleTask = simpleTask("get_user_info", "get_user_info", {
  userId: "${workflow.input.userId}",
});
const sendEmailSimpleTask = simpleTask("send_email", "send_email", {
  email: "${get_user_info.output.email}",
});

const sendSMSSimpleTask = simpleTask("send_sms", "send_sms", {
  phoneNumber: "${get_user_info.output.phoneNumber}",
});

export const createSimpleWorkflow = () => {
  const wf = workflow("email_send_workflow", [
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
  return workflow("email_send_workflow", [
    getUserinfoSimpleTask,
    switchOrSMS,
  ]);
};
