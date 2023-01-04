import { ConductorWorker } from "@io-orkes/conductor-javascript";
import { GET_USER_INFO, SEND_EMAIL, SEND_SMS } from "./constants";
export const userInfoWorker = (): ConductorWorker => {
  return {
    taskDefName: GET_USER_INFO,
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
    taskDefName: SEND_EMAIL,
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
    taskDefName: SEND_SMS,
    execute: async ({ inputData }) => {
      const phoneNumber = inputData?.phoneNumber;
      console.log("SENDING SMS TO " + phoneNumber);
      return {
        status: "COMPLETED",
      };
    },
  };
};
