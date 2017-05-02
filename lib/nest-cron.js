const Nest = require('node-nest')
const { map } = require('lodash')
const createJob = require('./job')

class NestCron {
  constructor ({ nest, jobs }) {
    this.nest = nest instanceof Nest ? nest : new Nest(nest)
    this.jobs = map(jobs, (jobData, i) => {
      return createJob(jobData, {
        context: {
          nest: this.nest,
          options: jobData.options,
          stop: this.stop.bind(this, i)
        }
      })
    })
  }

  stop (jobIndex) {
    const job = this.jobs[jobIndex]
    if (job) {
      job.stop()
    }
  }
}

module.exports = NestCron
