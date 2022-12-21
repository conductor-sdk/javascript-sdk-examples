# Typescript Quickstart Example

This repository contains sample applications that demonstrates the various features of Conductor TS SDK.

## SDK Features

TS SDK for Conductor allows you to:

1. Create workflow using Code
2. Execute workflows synchronously or asynchronously
3. Create workers for task execution and framework (TaskRunner) for executing workers and communicating with the server.
4. Support for all the APIs such as
   1. Managing tasks (poll, update etc.),
   2. Managing workflows (start, pause, resume, terminate, get status, search etc.)
   3. Create and update workflow and task metadata
   4. User and event management

### Running Example

> **Note**
> Obtain KEY and SECRET from the playground or your Conductor server

Export variables

```shell
export KEY=
export SECRET=
export CONDUCTOR_SERVER_URL=https://play.orkes.io/api
```

Run the main program

```shell
yarn #To install dependencies.
yarn test #To run the test examples
```

## Workflow

We create a simple 2-step workflow that fetches the user details and sends an email.

<table><tr><th>Visual</th><th>Code</th></tr>
<tr>
<td width="50%"><img src="resources/workflow.png" width="250px"></td>
<td>
<pre>

import {
simpleTask,
workflow,
switchTask,
} from "@io-orkes/conductor-javascript";

const getUserinfoSimpleTask = simpleTask("get_user_info", "get_user_info", {
userId: "${workflow.input.userId}",
});
const sendEmailSimpleTask = simpleTask("send_email", "send_email", {
  email: "${get_user_info.output.email}",
});

const sendSMSSimpleTask = simpleTask("send_sms", "send_sms", {
phoneNumber: "${get_user_info.output.phoneNumber}",
});

export const createSimpleWorkflow = () => {
const wf = workflow("email_send_workflow", [
getUserinfoSimpleTask,
sendEmailSimpleTask,
]);
return wf;
};

</pre>
</td>
</tr>
</table>

## Worker

Workers are implemented as simple functions with sample implementation.  
See [workers.ts](src/workers.ts) for details.

## Executing Workflows

There are two ways to execute a workflow:

1. Synchronously - useful for short duration workflows that completes within a few second.
2. Asynchronously - workflows that runs for longer period

### Asynchronous Workflow Execution

```typescript
const workflowExecutor = new WorkflowExecutor(client);
const executionId = await workflowExecutor.startWorkflow({
  name: simpleWf.name,
  version: simpleWf.version,
  input: { userId: "jim" },
});

// You can get the workflow status by 
const workflowStatus = await workflowExecutor.getWorkflow(
  executionId,
  true
);
```

See [sampleWorkflow.test.ts](src/sampleWorkflow.test.ts) for complete code sample of workflow execution.
