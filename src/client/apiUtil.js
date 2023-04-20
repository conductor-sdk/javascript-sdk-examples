const {
    OrkesApiConfig,
    orkesConductorClient,
    TaskManager,
    WorkflowExecutor,
} = require("@io-orkes/conductor-javascript");

const serverSettings = {
    keyId: `${process.env.KEY}`,
    keySecret: `${process.env.SECRET}`,
    serverUrl: `${process.env.CONDUCTOR_SERVER_URL}`,
};

const clientPromise = orkesConductorClient(serverSettings);

module.exports = {
    clientPromise: clientPromise,
}
