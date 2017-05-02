const Nest = require('node-nest')
const { map } = require('lodash')
const createJob = require('./job')

function NestCron (options) {
  if (!(this instanceof NestCron)) {
    return new NestCron(options)
  }

  const { nest, jobs } = options
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

NestCron.prototype.stop = function (jobIndex) {
  const job = this.jobs[jobIndex]
  if (job) {
    job.stop()
  }
}

module.exports = NestCron
