'use strict'
const phantom = require('phantom')
const assert = require('assert')
const app = require('../examples/app')

const baseURL = 'http://localhost:3001'

describe('Examples', function () {
  this.timeout(1e4)
  let server
  let browser
  let page

  before((done) => {
    server = app.listen(3001, () => {
      phantom.create().then(instance => {
        browser = instance
        done()
      })
    })
  })

  after((done) => {
    browser.exit()
    server.close(done)
  })

  describe('Drop-In', () => {
    it('adds elements to the page on startup', (done) => {
      assert(1)
      browser.createPage().then(openedPage => {
        page = openedPage
        return page.open(`${baseURL}/dropin.html`)
      }).then(() => {
        return new Promise((resolve) => setTimeout(resolve, 5e3))
      }).then(() => {
        return page.property('content')
      }).then(content => {
        assert(content.indexOf('assets.braintreegateway.com/dropin') !== -1)
        done()
      })
    })
  })
})
