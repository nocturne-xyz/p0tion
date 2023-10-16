<p align="center">
    <h1 align="center">
        Backend ⚙️
    </h1>
    <p align="center">An easy-to-configure, deploy and maintain cloud infrastructure solution for automating the coordination, scalability, and storage of your Groth16 zkSNARKs Phase 2 Trusted Setup ceremonies.</p>
</p>

<p align="center">
    <a href="https://github.com/privacy-scaling-explorations/p0tion">
        <img src="https://img.shields.io/badge/project-p0tion-blue.svg?style=flat-square">
    </a>
    <a href="https://github.com/privacy-scaling-explorations/p0tion/blob/main/LICENSE">
        <img alt="Github License" src="https://img.shields.io/github/license/privacy-scaling-explorations/p0tion.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/@nocturne-xyz/p0tion-backend">
        <img alt="NPM Version" src="https://img.shields.io/npm/v/@nocturne-xyz/p0tion-backend?style=flat-square" />
    </a>
    <a href="https://npmjs.org/package/@nocturne-xyz/p0tion-backend">
        <img alt="Downloads" src="https://img.shields.io/npm/dm/@nocturne-xyz/p0tion-backend.svg?style=flat-square" />
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint" />
    </a>
    <a href="https://prettier.io/">
        <img alt="Prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier" />
    </a>
</p>

<div align="center">
    <h4>
        <a href="https://github.com/privacy-scaling-explorations/p0tion/blob/main/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/privacy-scaling-explorations/p0tion/blob/main/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://discord.gg/sF5CT5rzrR">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

| This library provides everything needed to configure, deploy and manage the infrastructure required to run one or more Phase 2 Trusted Setup ceremonies. |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |

Launching the ready-to-run customized scripts everyone could handle whatever is needed to accomplish the users authentication, ceremony setup, coordination and finalization. You could count on the combination of services provided by the far most popular cloud solutions in the market, as AWS for S3 Storage and GCP Firebase for Authentication, Firestore DB and, Cloud Functions services.

![Components Diagram]("https://github.com/privacy-scaling-explorations/p0tion/blob/main/packages/backend/assets/components.png")

## 🛠 Installation

**Prerequisities**

-   Node.js version 16.0 or higher.
-   Yarn version 3.5.0 or higher.
-   A Firebase Application w/ active billing (Blaze Plan) in order to support Cloud Functions deployment.
-   Follow the [Installation](https://github.com/privacy-scaling-explorations/p0tion/blob/main/README.md#installation) and [Usage](https://github.com/privacy-scaling-explorations/p0tion/blob/main/README.md#usage) guide.
-   Generate and store a configuration file with your service account's credentials as stated in this [documentation](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account) inside the `packages/backend/serviceAccountKey.json` file.
-   Rename the `.firebaserc` production project alias with your Firebase project name.

Navigate to backend package by running

```bash
cd packages/backend
```

Copy the `.default.env` file as `.env`:

```bash
cp .env.default .env
```

And add your environment variables.

## 📜 Usage

### Authorization

Login using your Google Account to Firebase CLI running

```bash
yarn firebase:login
```

Run the following to logout

```bash
yarn firebase:logout
```

### Initialization

Initialize a new Firebase project interactively

```bash
yarn firebase:init
```

### Deployment

#### AWS Infrastructure

0. Login or create a [new AWS Account](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email).
    - The AWS free tier account will cover a good number of requests for ceremonies but there could be some costs based on your ceremony circuits size.
1. Create an access key for a user with Admin privileges (**NOT ROOT USER**)
2. Setup the `awscli` ([docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)) and add the keys for this user.
3. Install `terraform` ([docs](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli))
4. Decide on an AWS region (by default this is **us-east-1**) - if you want to change you will need to do the following:
    1. update **aws/lambda/index.mjs** ([exact line](https://github.com/privacy-scaling-explorations/p0tion/blob/dev/packages/backend/aws/lambda/index.mjs#L3)) to the new region
    2. update **main.tf** ([exact line](https://github.com/privacy-scaling-explorations/p0tion/blob/dev/packages/backend/aws/main.tf#L2)) to the new region
5. zip the Lambda folder:
    1. `cd lambda`
    2. `zip -r ../lambda.zip .`
6. Run terraform:
    1. `terraform init`
    2. `terraform plan`
    3. `terraform apply`
    4. `terraform output secret_key`
        - To print the secret access key for the IAM user
    5. Store the other values (sns_topic_arn etc.)
        - These will be needed for the .env file configuration

The IAM user created with the steps above can be used for all p0tion's features.

#### Firebase

Deploy the current configuration to the `prod` project running

```bash
yarn firebase:deploy
```

To deploy only the latest Cloud Functions run

```bash
yarn firebase:deploy-functions
```

To deploy only the latest Firestore configuration and rules run

```bash
yarn firebase:deploy-firestore
```

### Local Emulator

Firebase provides a [Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) as a set of advanced dev-tools w/ a rich user-interface to build and test apps locally using Firebase services as Cloud Functions, Firestore and Authentication.

**Prerequisities**

-   You will need Java JDK version 11 or higher to run the Firebase Local Emulator.

To start the Emulator run

```bash
yarn emulator:serve
```

To emulate only Cloud Functions service run

```bash
yarn emulator:serve-functions
```

To run the Emulator shell in a new command line window run

```bash
yarn emulator:shell
```

To run tests (e2e/unit) locally in the Emulator run

```bash
yarn test:emulator
```
