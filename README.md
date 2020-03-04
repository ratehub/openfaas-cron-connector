# openfaas-cron-connector
A Node.js-based cron connector for [OpenFaaS](https://www.openfaas.com "OpenFaaS Project"), which allows users to specify a cron expression to call their function on, as well as a timezone for the cron schedule to follow. It can be deployed alongside OpenFaaS, or in an external cluster, as long as it can access the OpenFaaS gateway.

## Installation


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
