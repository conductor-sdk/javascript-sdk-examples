import { GET_USER_INFO, SEND_EMAIL, SEND_SMS } from "../constants";

export const userInfoWorker = () => {
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

export const sendEmailWorker = () => {
  return {
    taskDefName: SEND_EMAIL,
    execute: async ({ inputData }) => {
      const email = inputData?.email;
      console.log(`Sent email to: ${email}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};

export const sendSmsWorker = () => {
  return {
    taskDefName: SEND_SMS,
    execute: async ({ inputData }) => {
      const phoneNumber = inputData?.phoneNumber;
      console.log(`Sent SMS to: ${phoneNumber}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};
