const CronJob = require('cron').CronJob;

var mySemaphore = null;

const JOB = new CronJob('*/5 * * * * *', async function () {
    console.log((new Date()).toISOString() + ' - job5s start');

    const [value, release] = await mySemaphore.acquire();
    try {
        console.log((new Date()).toISOString() + ' - job5s semaphore acquired');
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch(ex) {
        console.log((new Date()).toISOString() + ' - job5s exception', ex);
    } finally {
        release();
        console.log((new Date()).toISOString() + ' - job5s semaphore released');
    }

    console.log((new Date()).toISOString() + ' - job5s end');
}, null, false);

exports.start = async function(sem) {
    mySemaphore = sem;
    JOB.start();
}

exports.stop = async function() {
    JOB.stop();
}