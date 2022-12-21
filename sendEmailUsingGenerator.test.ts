import { expect, describe, test, afterAll } from "@jest/globals";
import { createSimpleWorkflow, createComplexWf } from "./workflowCreator";
import { userInfoWorker, sendEmailWorker, sendSMSWorker } from "./workers";
import {
  OrkesApiConfig,
  orkesConductorClient,
  TaskManager,
  TaskType,
  WorkflowExecutor,
} from "@io-orkes/conductor-typescript";

const playConfig: Partial<OrkesApiConfig> = {
  keyId:"",
  keySecret:"",
  serverUrl: "https://play.orkes.io/api",
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
      sendSMSWorker()
    ]);
    runner.startPolling();

    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
      name: simpleWf.name,
      version: simpleWf.version,
      input: { userId: "jim", notificationPref: "sms" },
    });
    await new Promise((r) => setTimeout(() => r(true), 3000));
    const workflowStatus = await workflowExecutor.getWorkflow(
      executionId,
      true
    );
    runner.stopPolling();
  });
});
