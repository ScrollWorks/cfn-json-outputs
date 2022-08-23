#!/usr/bin/env node

const { writeFileSync } = require("fs");
const {
	CloudFormationClient,
	DescribeStacksCommand,
} = require("@aws-sdk/client-cloudformation");
const commandLineArgs = require("command-line-args");

const { stackName, awsRegion, awsAccessKey, awsSecret, outputFile } =
	commandLineArgs([
		{ name: "stackName", alias: "n", type: String },
		{ name: "awsRegion", alias: "r", type: String },
		{ name: "awsAccessKey", alias: "k", type: String },
		{ name: "awsSecret", alias: "s", type: String },
		{ name: "outputFile", alias: "o", type: String },
	]);

const client = new CloudFormationClient({
	...(awsAccessKey && awsSecret
		? { credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecret } }
		: {}),
	...(awsRegion ? { region: awsRegion } : {}),
});

(async () => {
	const response = await client.send(
		new DescribeStacksCommand({ StackName: stackName })
	);
	const outputJson = response.Stacks[0].Outputs.reduce(
		(allOutputs, { OutputKey, OutputValue }) => {
			return { ...allOutputs, [OutputKey]: OutputValue };
		},
		{}
	);
	writeFileSync(outputFile || "outputs.json", JSON.stringify(outputJson));
	console.log(`Output file "${outputFile}" generated successfully.`);
})();
