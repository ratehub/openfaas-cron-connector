const newrelic = require('newrelic');
const cron = require("node-cron");
const fetch = require("node-fetch");


class CronJob {
    constructor(functionName, schedule, timezone, logger) {
        this.functionName = functionName;
        this.schedule = schedule;
        this.timezone = timezone;
        this.requestTimeout = (process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 30000);
        this.job;
        this.logger = logger;
    }

    //Create cron job and start it
    async scheduleJob(faasURI) {
        //Set timezone if specified
        if (this.timezone) {
            this.job = cron.schedule(this.schedule, async () => {
                await this.executeJob(faasURI);
            },
            {
                timezone: this.timezone
            });
        }
        else {
            this.job = cron.schedule(this.schedule, async () => {
                await this.executeJob(faasURI);
            });
        }
    }

    //Function to be called by cron scheduler
    async executeJob(faasURI) {
        await newrelic.startBackgroundTransaction(`trigger-${this.functionName}`, async () => {
            try {
                //Invoke function
                let functionResponse = await fetch(`${faasURI}/async-function/${this.functionName}`, {
                    method: 'post',
                    timeout: this.requestTimeout
                });
                if (functionResponse.ok) {
                    this.logger.info(`Successfully invoked function: ${this.functionName}`);
                } else {
                    this.logger.error(`Error invoking function: ${this.functionName}`);
                    this.logger.error(`Status: ${functionResponse.statusText}`);
                    throw Error(await functionResponse.text());
                }
            } catch (err) {
                this.logger.info(`${err}`);
                throw err;
            } finally {
                this.logger.info(`Finished: ${this.functionName}`);
            }
        });
    }

    //Destroy running cron job permanently
    destroyJob() {
        this.job.destroy();
    }

    //Returns true if all attributes are the same as paramaters
    compare(functionName, schedule, timezone) {
        return (functionName === this.functionName && schedule === this.schedule && timezone === this.timezone);
    }
}

module.exports = CronJob;
