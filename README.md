<h1 align="center">openfaas-cron-connector ⚙</h1>

💬 What is this service?
A Node.js-based cron connector for [OpenFaaS](https://www.openfaas.com "OpenFaaS Project")

💡 Why was this service created?

Allows developers to specify a cron expression to call their function on, as well as a timezone for the cron schedule to follow. It can be deployed alongside OpenFaaS, or in an external cluster, as long as it can access the OpenFaaS gateway.


⏰ When to use this service?
This service is used implicitly, annotate faas functions with the cron expressions and configuration when a developer needs to have a Faas function executed on a schedule.


🚀 How to configure, run, and use this service?
### Helm Chart Options
| Option              | Usage                                                   | Default Value                             |
| ------------------- | ------------------------------------------------------- | ----------------------------------------- |
| `connector_name`    | The name of the cron-connector deployment in Kubernetes | `openfaas-cron-connector`                 |
| `faas_gateway`      | The location of the OpenFaaS gateway, if you've installed it in the same namespace as OpenFaaS, use the default value, which is the internal Kubernetes address (also, make sure not to put `http://` or `https://` at the start or `/` at the end)                                                              | `gateway:8080`                            |
| `gateway_ssl`       | Specifies whether faas_gateway uses https or http       | `false`                                   |
| `faas_gateway_user` | The basic-auth username for the faas_gateway, not required if using the default faas_gateway  |     |
| `faas_gateway_pass` | The basic-auth username for the faas_gateway, not required if using the default faas_gateway  |     |
| `timeout`           | Time in milliseconds to wait for function to finish     | `30000`                                   |

## Usage
To schedule a cron job for a function, simply specify a "schedule" annotation in your stack.yml file like this:
```
functions:
  my-function:
    lang: node12
    handler: ./my-function
    image: my-function:latest
    annotations:
      schedule: "*/3 * * * *"
```
In the above example, the function will be run every 3 minutes. The function will be invoked via a POST request to the OpenFaaS gateway, and the request body will be empty.

### Using Seconds
Seconds are not standard in cron, but the cron-connector supports this feature. To use seconds, just add to the left side of the cron expression, like so: 

```
schedule: "*/30 * * * * *"
```
In the above example, the function will be invoked every 30 seconds. Note that there are now 6 instructions compared to the 5 in the previous example.

### Timezones
By default, the cron-connector will use the timezone of the system it's running on. However, if you'd like to ensure that it stays in a particular timezone, you can add the "timezone" annotation in your stack.yml file like this:
```
annotations:
  schedule: "*/3 * * * *"
  timezone: "America/New_York"
```
For a full list of available timezone strings, see [this JSON list](https://raw.githubusercontent.com/node-cron/tz-offset/a67968ab5b0efa6dee296dac32d3205b41f158e0/generated/offsets.json "JSON list of timezones").

For help writing cron expressions, try using https://crontab.guru. Note that this site does not support seconds, while the cron-connector does.



🟪 [DEV] https://github.com/ratehub/ratehub-k8s/tree/master/do-dev-1/microservices/apps/example-service.yaml

🟧 [QA] https://github.com/ratehub/ratehub-k8s/tree/master/gke-staging-01/microservices/apps/example-service.yaml

🟥 [PROD] https://github.com/ratehub/ratehub-k8s-prod/tree/master/gcp-prod-01/microservices/apps/example-service.yaml


