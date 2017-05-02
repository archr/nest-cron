const { expect } = require('chai')
const Nest = require('node-nest')
const NestCron = require('../lib/nest-cron')

describe('NestCron', () => {
  it('should create a instance', function () {
    const cron = NestCron({
      nest: {},
      jobs: []
    })

    expect(cron).to.be.an.instanceof(NestCron)
  })

  it('should use a instance of nest', function () {
    const nest = new Nest({ workers: 3 })
    const cron = new NestCron({
      nest: nest,
      jobs: []
    })

    expect(cron.nest.workersAmount).equal(3)
  })

  it('should create a new job', function (done) {
    const cron = new NestCron({
      nest: {},
      jobs: [
        {
          cronTime: '* * * * * *',
          start: true,
          options: { status: 'finalized' },
          onTick: function () {
            this.stop()
            done()
          }
        }
      ]
    })

    expect(cron.jobs.length).equal(1)
  })

  it('should set the context', function (done) {
    const cron = new NestCron({
      nest: {},
      jobs: [
        {
          cronTime: '* * * * * *',
          start: true,
          options: { status: 'finalized' },
          onTick: function () {
            expect(this.nest).to.exist // eslint-disable-line
            expect(this.options.status).equal('finalized')

            this.stop()
            done()
          }
        }
      ]
    })

    expect(cron.jobs.length).equal(1)
  })
})
