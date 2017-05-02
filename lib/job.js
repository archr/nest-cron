const cron = require('cron')

module.exports = function createJob (data, options) {
  const job = new cron.CronJob({
    cronTime: data.cronTime,
    timeZone: data.timeZone,
    start: data.start,
    onTick: data.onTick,
    onComplete: data.onComplete,
    context: options.context
  })

  return job
}
