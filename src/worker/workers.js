const {
  GET_USER_INFO,
  SEND_EMAIL,
  SEND_SMS,
} = require("../constants");

const userInfo = () => {
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

const sendEmail = () => {
  return {
    taskDefName: SEND_EMAIL,
    execute: async ({ inputData }) => {
      console.log(`Sent email to: ${inputData?.email}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};

const sendSms = () => {
  return {
    taskDefName: SEND_SMS,
    execute: async ({ inputData }) => {
      console.log(`Sent SMS to: ${inputData?.phoneNumber}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};


module.exports = {
  userInfoWorker: userInfo,
  sendEmailWorker: sendEmail,
  sendSmsWorker: sendSms,
}
