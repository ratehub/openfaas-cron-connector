const cron = require("node-cron");
const fetch = require("node-fetch");


class CronJob {
    constructor(functionName, schedule, timezone) {
        this.functionName = functionName;
        this.schedule = schedule;
        this.timezone = timezone;
        this.requestTimeout = (process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 30000);
        this.job;
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
        try {
            //Invoke function
            let functionResponse = await fetch(`${faasURI}/function/${this.functionName}`, {
                method: 'post',
                timeout: this.requestTimeout
            });
            if (functionResponse.ok) {
                console.log(`Successfully invoked function: ${this.functionName}`);
            }
            else {
                console.error(`Error invoking function: ${this.functionName}`);
                console.error(JSON.stringify(`Status: ${functionResponse.statusText}`));
                throw Error(JSON.stringify(await functionResponse.json()));
            }
        }
        catch (err) {
            console.log(`Error: ${err}`);
            throw err;
        }
        finally {
            console.log(`Finished: ${this.functionName}`);
        }
    }

    destroyJob() {
        this.job.destroy();
    }

    //Returns true if all attributes are the same as paramaters
    compare(functionName, schedule, timezone) {
        return (functionName === this.functionName && schedule === this.schedule && timezone === this.timezone);
    }
}

module.exports = CronJob;
