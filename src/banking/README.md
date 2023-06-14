# Typescript Example
Simple worker example in Typescript. will run the workflow. and the worker

### Running Example

> **Note**
Obtain KEY and SECRET from the playground or your Conductor server. [Quick tutorial for playground](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#access-keys)

Export variables
```shell
export KEY=
export SECRET=
export SERVER_URL=https://play.orkes.io/api
export WORKFLOW_NAME="banking"
export WORKFLOW_VERSION=1
```

Run the main program
```shell
ts-node src/banking/main.ts
```