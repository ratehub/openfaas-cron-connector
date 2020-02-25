const cron = require("node-cron");
const fetch = require("node-fetch");


class CronJob {
    constructor(functionName, schedule, timezone) {
        this.functionName = functionName;
        this.schedule = schedule;
        this.timezone = timezone;
    }

    //Create cron job and start it
    async scheduleJob() {
        //Set timezone if specified
        if (this.timezone) {
            cron.schedule(this.schedule, () => {
                this.executeJob(functionData);
            },
            {
                timezone: this.timezone
            });
        }
        else {
            cron.schedule(this.schedule, () => {
                this.executeJob(functionData);
            });
        }
    }

    //Function to be called by cron scheduler
    async executeJob(functionData) {
        try {
            //Invoke function
            let functionResponse = await fetch(`${process.env.FAAS_URL}/function/${this.functionName}`, {
                method: 'post',
                timeout: requestTimeout
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
            throw error;
        }
        finally {
            console.log(`Finished: ${this.functionName}`);
        }
    }

    //Returns true if all attributes are the same as paramaters
    compare(functionName, schedule, timezone) {
        return (functionName === this.functionName && schedule === this.schedule && timezone === this.timezone);
    }
}

module.exports = CronJob;
