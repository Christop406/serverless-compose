_**BETA:** This repository contains a beta version of a new Serverless Framework feature._

Deploy and orchestrate multiple Serverless Framework services in monorepositories.

```yaml
name: myapp

subscriptions:
  component: serverless-framework
  path: subscriptions

users:
  component: serverless-framework
  path: users
```

## Beta version

This repository contains a beta version of a new Serverless Framework feature: multi-service deployments.

While in beta, the feature is in a separate repository and NPM package. Eventually it will be merged in the main `serverless` CLI and project.

We use GitHub issues to discuss ideas and features: we encourage you to **subscribe** to GitHub repository notifications and get involved in discussions.

## Installation

While in beta, the feature ships as a separate package and CLI. Install it via NPM:

```bash
npm -g i @serverless/components-v4-beta
```

The CLI can now be used via the following command:

```bash
components-v4
```

_Note: while in beta, the feature is available via the `components-v4` command, not the main `serverless` CLI._

## Usage

The multi-service deployment feature is designed for **monorepositories**.

Assuming you have an application containing multiple Serverless Framework services, for example:

```bash
my-project/
  service-a/
    src/
      ...
    serverless.yml
  service-b/
    src/
      ...
    serverless.yml
```

You can now create a **new top-level** `serverless.yml` configuration file at the root of your mono-repository.

In that new file, you can reference existing Serverless Framework projects by their **relative paths**:

```yaml
# Name of the application
name: myapp

service-a:
  component: serverless-framework
  # Relative path to the Serverless Framework service
  path: service-a

service-b:
  component: serverless-framework
  # Relative path to the Serverless Framework service
  path: service-b
```

To deploy all services, instead of running `serverless deploy` in each service, you can now deploy all services at once via:

```bash
$ components-v4 deploy

Deploying myapp to stage dev

    ✔  service-a › deployed › 15s
    ✔  service-b › deployed › 31s

```

**⚠️ Warning:** The deployment will run `serverless deploy` in each service directory. If Serverless Framework is installed locally (in `node_modules/`) in some services, you need to make sure Serverless Framework v3.3.0 or greater is installed.

### Service dependencies and variables

TODO

### Global commands

TODO

- info
- logs

### Service-specific commands

It is possible to run commands for a specific component only. For example to deploy only a specific component:

```bash
components-v4 deploy --component=service-a

# Shortcut alternative
components-v4 service-a:deploy
```

Or tail logs of a single function:

```bash
components-v4 logs --component=service-a --function=index

# Shortcut alternative
components-v4 service-a:logs --function=index
```

All Serverless Framework commands are supported via service-specific commands, including custom commands from plugins.

### Supported Serverless Framework features

(not sure about this title)

Goal: explictly expose differences with traditionnal Serverless Framework configuration files.

TODO