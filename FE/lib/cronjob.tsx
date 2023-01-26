// import CronJob as cron
import CronJob from 'cron';


export default class CronJobx {
  constructor() {
    console.log(CronJob)
    const job = new CronJob.CronJob('*/5 * * * * *', function() {
      console.log('You will see this message every second');
    })
    job.start();
  }
}
