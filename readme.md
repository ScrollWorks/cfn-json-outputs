Very simple node cli application that allows you to export the outputs of a cloudformation stack directly to a json file.

## How do I use it?

`npx @scrollworks/cfn-json-outputs -n stackName` should be enough if you have your AWS credentials available as the [default environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

### CLI options available

- **Stack name**: `-n` or `--stackName`
- **Output file**: `-o` or `--outputFile`
- **AWS region**: `-r` or `--awsRegion`
- **AWS access key ID**: `-k` or `--awsAccessKey`
- **AWS secret access key**: `-s` or `--awsSecret`

This an example invocation passing all the parameters:
`npx @scrollworks/cfn-json-outputs -n myCFStack -o output.json -r eu-west-1 -k myAwsAccessKeyId -s myAwsSecretAccessKey`

## Why?

Having the outputs of our stack in a json file allows us to conveniently import these values into our programs, for instance:

    const  cloudParams = require("../outputs.json");
    const  client = new  CognitoIdentityProviderClient({});
    const  command = new  SignUpCommand({
    	clientId:  cloudParams.UserPoolClientID
    	Password:  "hackme",
    	Username:  "emusk@tesla.com"
    });
