const fs = require('fs').promises;
const cron = require("node-cron");
const fetch = require("node-fetch");
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const CronJob = require("./CronJob");


let gatewayUser = process.env.FAAS_GATEWAY_USER;
let gatewayPass = process.env.FAAS_GATEWAY_PASS;
//Stores all currently scheduled jobs
let activeJobsList = [];

(async () =>
{
    try {
        console.log("Starting cron connector");

        //Read OpenFaaS gateway secrets
        if (!gatewayUser || !gatewayPass) {
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
            await cleanUpCronJobs(functions);
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
            var crondex = indexOfCronJob(functionData.name, activeJobsList);
            //If job doesn't exist yet
            if (crondex === -1) {
                console.log(`Creating cron job for ${functionData.name}`);
                let job = new CronJob(functionData.name, functionData.annotations.schedule, functionData.annotations.timezone);
                await job.scheduleJob();
                activeJobsList.push(job);
            }
            //If job exists but has some different property or properties, destroy existing one and create a new one
            else if (!activeJobsList[crondex].compare(functionData.name, functionData.annotations.schedule, functionData.annotations.timezone)) {
                console.log(`Modifying cron job for ${functionData.name}`);
                let job = new CronJob(functionData.name, functionData.annotations.schedule, functionData.annotations.timezone);
                activeJobsList[crondex].destroyJob();
                await job.scheduleJob();
                activeJobsList[crondex] = job;
            }
        }
    }
}

//Find and remove jobs that are no longer needed
async function cleanUpCronJobs(functions) {
    let jobsList = [...activeJobsList];

    for (let functionData of functions) {
        let jobdex = indexOfCronJob(functionData.name, jobsList);
        //If the function exists and has a cron job, remove it from the temporary list
        if (functionData.annotations.schedule && functionData.name === jobsList[jobdex].functionName) {
            jobsList.splice(jobdex, 1);
        }
    }

    //If any jobs remain in the temporary list, remove them since they have no function related to them anymore
    for (let i = 0; i < jobsList.length; i++) {
        let crondex = indexOfCronJob(jobsList[i].functionName, jobsList);
        activeJobsList[crondex].destroyJob();
        activeJobsList.splice(crondex, 1);
        console.log(`Removing cron job for ${jobsList[i].functionName}`);
    }
}

//Returns -1 if function doesn't have an active job, otherwise returns index in activeJobsList array
function indexOfCronJob(functionName, jobsList) {
    for (let i = 0; i < jobsList.length; i++) {
        if (functionName === jobsList[i].functionName) {
            return i;
        }
    }
    return -1;
}
