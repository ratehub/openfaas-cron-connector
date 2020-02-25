const fs = require('fs').promises;
const cron = require("node-cron");
const fetch = require("node-fetch");
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const CronJob = require("CronJob");


let gatewayUser = process.env.GATEWAY_USER;
let gatewayPass = process.env.GATEWAY_PASS;
let requestTimeout = process.env.TIMEOUT || 30000;
requestTimeout = Number(requestTimeout);
let jobsList = [];

(async () =>
{
    try {
        console.log("Starting cron connector");

        //Read OpenFaaS gateway secrets
        if (await fs.exists('/var/secrets/basic-auth-user')) {
            gatewayUser = await fs.readFile('/var/secrets/basic-auth-user');
            gatewayPass = await fs.readFile('/var/secrets/basic-auth-password');
        }

        let functions = await retrieveFunctions();
        await createCronJobs(functions);

        //Check regularly for new additions to the cron connector
        cron.schedule("*/3 * * * * *", async function() {
            console.log("Refreshing functions...");
            let functions = await retrieveFunctions();
            await createCronJobs(functions);
            console.log("...Finished function refresh");
        });
    }
    catch (err) {
       console.error(err);
    }
})();

//Retrieves list of functions from gateway
async function retrieveFunctions() {
    let res = await fetch(`${process.env.FAAS_URL}/system/functions`);
    let functions = await res.json();

    return functions;
}

//Gets cron info from function list and creates cron jobs appropriately
async function createCronJobs(functions) {
    for (let functionData of functions) {
        //Only create a job for functions that have been annotated with schedule
        if (functionData.annotations.schedule) {
            let job = new CronJob(functionData.name, functionData.annotations.schedule, functionData.annotations.timezone);
            await job.scheduleJob();
            jobsList.push(job);
        }
    }
}
