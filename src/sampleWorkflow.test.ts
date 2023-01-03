import { expect, describe, test } from "@jest/globals";
import { createSimpleWorkflow, createComplexWf } from "./workflowCreator";
import { userInfoWorker, sendEmailWorker, sendSMSWorker } from "./workers";
import {
  OrkesApiConfig,
  orkesConductorClient,
  TaskManager,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import { GET_USER_INFO,SEND_EMAIL,SEND_SMS } from "./constants";

const playConfig: Partial<OrkesApiConfig> = {
  keyId: `${process.env.KEY}`,
  keySecret: `${process.env.SECRET}`,
  serverUrl: `${process.env.CONDUCTOR_SERVER_URL}`,
};

describe("Should create workflow Simple", () => {
  const clientPromise = orkesConductorClient(playConfig);
  const simpleWf = createSimpleWorkflow();
  test("Creates a simple worker", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);
    await expect(
      workflowExecutor.registerWorkflow(true, simpleWf)
    ).resolves.not.toThrowError();
  });
  test("Create task definitions for task", async ()=>{
    
    const client = await clientPromise;
    await expect(
      client.metadataResource.registerTaskDef([{name:GET_USER_INFO,timeoutSeconds:3600},{name:SEND_EMAIL,timeoutSeconds:3600},{name:SEND_SMS,timeoutSeconds:3600}])
    ).resolves.not.toThrowError();

  })
  test("Start the workers and runs worklfow", async () => {
    const client = await clientPromise;
    const runner = new TaskManager(client, [
      userInfoWorker(),
      sendEmailWorker(),
    ]);
    runner.startPolling();

    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
      name: simpleWf.name,
      version: simpleWf.version,
      input: { userId: "jim" },
    });
    await new Promise((r) => setTimeout(() => r(true), 2000));
    console.log(
      `\nSimple Workflow has been executed you can look into the details following this link ${process.env.CONDUCTOR_SERVER_URL?.replace(
        "api",
        "execution"
      )}/${executionId}`
    );
    const workflowStatus = await workflowExecutor.getWorkflow(
      executionId,
      true
    );
    runner.stopPolling();
  });
});

describe("Should create workflow Complex", () => {
  const clientPromise = orkesConductorClient(playConfig);
  const simpleWf = createComplexWf();
  test("Creates a simple worker", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);
    await expect(
      workflowExecutor.registerWorkflow(true, simpleWf)
    ).resolves.not.toThrowError();
  });
  test("Start the workers and runs worklfow", async () => {
    const client = await clientPromise;
    const runner = new TaskManager(client, [
      userInfoWorker(),
      sendEmailWorker(),
      sendSMSWorker(),
    ]);
    runner.startPolling();

    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
      name: simpleWf.name,
      version: simpleWf.version,
      input: { userId: "jim", notificationPref: "sms" },
    });
    await new Promise((r) => setTimeout(() => r(true), 3000));

    console.log(
      `\nComplex Workflow has been executed you can look into the details following this link ${process.env.CONDUCTOR_SERVER_URL?.replace(
        "api",
        "execution"
      )}/${executionId}`
    );
    const workflowStatus = await workflowExecutor.getWorkflow(
      executionId,
      true
    );
    runner.stopPolling();
  });
});
