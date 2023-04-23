const {
    userInfoWorker,
    sendEmailWorker,
    sendSmsWorker,
} = require("./workers");

const { clientPromise } = require("../client/apiUtil")
const { TaskManager } = require("@io-orkes/conductor-javascript");

async function createTaskManager() {
    const client = await clientPromise;
    return new TaskManager(client, [
        userInfoWorker(),
        sendEmailWorker(),
        sendSmsWorker(),
    ], { logger: console, options: { concurrency: 5, pollInterval: 100 } });
}

module.exports = {
    createTaskManager: createTaskManager,
}
