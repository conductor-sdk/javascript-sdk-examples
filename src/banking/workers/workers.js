const fraudService = require("../services/fraud-service");

// docs-marker-start-1
const fraudCheckWorker = {
  taskDefName: "fraud-check",
  execute: async ({ inputData }) => {
    const { amount, accountId } = inputData;
    const fraudResult = fraudService.isFraudulentTxn(accountId, amount);
    return {
      outputData: fraudResult,
      status: "COMPLETED",
    };
  },
  domain: "fraud", // Optional
  pollInterval: 100, // Optional can be specified in the TaskManager
  concurrency: 1, // Optional can be specified in the TaskManager
};
// docs-marker-end-1

module.exports = {
  fraudCheckWorker,
};
