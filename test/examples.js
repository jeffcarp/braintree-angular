'use strict'
const phantom = require('phantom')
const assert = require('assert')
const createServer = require('http-server').createServer

const baseURL = 'http://localhost:3001'

describe('Examples', function () {
  this.timeout(1e4)
  let server
  let browser
  let page

  before((done) => {
    server = createServer()
    server.listen(3001, () => {
      phantom.create().then(instance => {
        browser = instance
        done()
      })
    })
  })

  after((done) => {
    browser.exit()
    server.close()
    setTimeout(done, 2e3)
  })

  describe('Drop-In', () => {
    it('adds elements to the page on startup', (done) => {
      assert(1)
      browser.createPage().then(openedPage => {
        page = openedPage
        return page.open(`${baseURL}/examples/dropin.html`)
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

  describe('PayPal', () => {
    it('adds elements to the page on startup', (done) => {
      assert(1)
      browser.createPage().then(openedPage => {
        page = openedPage
        return page.open(`${baseURL}/examples/paypal.html`)
      }).then(() => {
        return new Promise((resolve) => setTimeout(resolve, 5e3))
      }).then(() => {
        return page.property('content')
      }).then(content => {
        assert(content.indexOf('https://checkout.paypal.com/pwpp') !== -1)
        done()
      })
    })
  })
})
