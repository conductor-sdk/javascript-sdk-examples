import {
  TaskRunner,
  ConductorClient,
  generate,
  generateHTTPTask,
  generateInlineTask,
  TaskType,
  WorkflowDef,
  RunnerArgs,
  ConductorWorker,
} from "@io-orkes/conductor-javascript";

export const userInfoWorker = (): ConductorWorker => {
  return {
    taskDefName: "get_user_info",
    execute: async ({ inputData }) => {
      const userId = inputData?.userId;
      return {
        outputData: {
          email: `${userId}@email.com`,
          phoneNumber: "555-555-5555",
        },
        status: "COMPLETED",
      };
    },
  };
};

export const sendEmailWorker = (): ConductorWorker => {
  return {
    taskDefName: "send_email",
    execute: async ({ inputData }) => {
      const email = inputData?.email;
      console.log("SENDING EMAIL TO " + email);
      return {
        status: "COMPLETED",
      };
    },
  };
};

export const sendSMSWorker = (): ConductorWorker => {
  return {
    taskDefName: "send_sms",
    execute: async ({ inputData }) => {
      const phoneNumber = inputData?.phoneNumber;
      console.log("SENDING SMS TO " + phoneNumber);
      return {
        status: "COMPLETED",
      };
    },
  };
};
