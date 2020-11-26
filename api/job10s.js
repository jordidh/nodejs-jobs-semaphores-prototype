const CronJob = require('cron').CronJob;

var mySemaphore = null;

const JOB = new CronJob('*/10 * * * * *', async function () {
    console.log((new Date()).toISOString() + ' - job10s start');

    const [value, release] = await mySemaphore.acquire();
    try {
        console.log((new Date()).toISOString() + ' - job10s semaphore acquired');
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch(ex) {
        console.log((new Date()).toISOString() + ' - job10s exception', ex);
    } finally {
        release();
        console.log((new Date()).toISOString() + ' - job10s semaphore released');
    }

    console.log((new Date()).toISOString() + ' - job10s end');
}, null, false);

exports.start = async function(sem) {
    mySemaphore = sem;
    JOB.start();
}

exports.stop = async function() {
    JOB.stop();
}