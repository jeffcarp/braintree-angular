'use strict'
const phantom = require('phantom')
const assert = require('assert')
const app = require('../support/app')

const baseURL = 'http://localhost:3001'

describe.skip('Advanced Integration', function () {
  it('adds elements to the page on setup', (done) => {
    let sitepage = null
    let phInstance = null
    let server = app.listen(3001, () => {
      phantom.create()
        .then(instance => {
          phInstance = instance
          return instance.createPage()
        })
        .then(page => {
          sitepage = page
          return page.open(baseURL + '/test-advanced.html')
        })
        .then(status => {
          return sitepage.evaluate(function () {
            return window.braintreeApiInitialized
          })
        })
        .then(result => {
          assert(result, 'Braintree API client was initialized')
        })
        .then(() => {
          sitepage.close()
          phInstance.exit()
          server.close(done)
        })
        .catch(error => {
          console.log(error)
          assert.fail()
          phInstance.exit()
          server.close(done)
        })
    })
  })
})
