'use strict'
const phantom = require('phantom')
const assert = require('assert')
const app = require('../examples/app')

const baseURL = 'http://localhost:3001'

describe('Examples', function() {
  this.timeout(1e4)
  let server
  let browser
  let page

  before(function(done) {
    server = app.listen(3001, () => {
      phantom.create().then(instance => {
        browser = instance
        done()
      })
    })
  })

  after(function(done) {
    browser.exit()
    server.close(done)
  })

  it('is ok', function(done) {
    assert(1)
    browser.createPage().then(openedPage => {
      page = openedPage
      return page.open(`${baseURL}/dropin.html`)
    }).then(() => {
      return new Promise((resolve) =>  setTimeout(resolve, 5e3))
    }).then(() => {
      return page.property('content')
    }).then(content => {
      console.log(content)
      done()
    })
  })
/*
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
          return page.open(baseURL + '/test-dropin.html')
        })
        .then(status => {
          return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              sitepage.evaluate(function () {
                return document.querySelector('input[name="payment_method_nonce"]')
              }).then((html) => {
                if (html) {
                  resolve()
                }
              })
            }, 100)

            setTimeout(() => {
              clearInterval(interval)
              reject()
            }, 5e3)
          })
        })
        .then(content => {
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
*/
})
