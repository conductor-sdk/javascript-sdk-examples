const { orkesConductorClient } = require("@io-orkes/conductor-javascript");

const serverSettings = {
    keyId: process.env.KEY,
    keySecret: process.env.SECRET,
    serverUrl: process.env.CONDUCTOR_SERVER_URL,
};

const clientPromise = orkesConductorClient(serverSettings);

function getWorkflowExecutionUrl(workflowId) {
    return `${process.env.CONDUCTOR_SERVER_URL}/execution/${workflowId}`;
}

module.exports = {
    clientPromise: clientPromise,
    getWorkflowExecutionUrl: getWorkflowExecutionUrl,
}
