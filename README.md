# nest-cron
Added cron jobs to nest

### Usage
```
const NestCron = require('.')

const job = {
  cronTime: '* * * * * *',
  start: true,
  options: { 'state.finished': true },
  onTick: function () {
    this.nest.db.Queue.count(this.options).then((jobs) => {
      console.log(`${jobs} jobs finished`)
    })
  }
}

const cron = new NestCron({
  nest: {
    mongo: {
      db: 'nest-db',
      host: '127.0.0.1',
      port: '27017'
    }
  },
  jobs: [job]
})

console.log(`${cron.jobs.length} cron jobs`)
```
