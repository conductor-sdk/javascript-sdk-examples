const { orkesConductorClient } = require("@io-orkes/conductor-javascript");

const serverSettings = {
    keyId: process.env.KEY,
    keySecret: process.env.SECRET,
    serverUrl: process.env.CONDUCTOR_SERVER_URL,
};

const clientPromise = orkesConductorClient(serverSettings);

function getWorkflowExecutionUrl(workflowId) {
    const baseUrl = `${process.env.CONDUCTOR_SERVER_URL}`;
    return `${baseUrl.substring(0, baseUrl.length - 4)}/execution/${workflowId}`;
}

module.exports = {
    clientPromise: clientPromise,
    getWorkflowExecutionUrl: getWorkflowExecutionUrl,
}
