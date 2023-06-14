const THRESHOLD_AMOUNT = 100 * 1000;

 const isFraudulentTxn = (__accountId, amount) => {
  // This is a dummy implementation of fraud check service
  // In real world, this would be a call to a fraud check service
  // that would return true or false
  if (amount > THRESHOLD_AMOUNT) {
    return {
      result: "FAIL",
      reason: "Amount above threshold",
    };
  }
  return {
    result: "PASS",
    reason: "All good!",
  };
};

module.exports = {
  isFraudulentTxn
};