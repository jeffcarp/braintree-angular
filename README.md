# braintree-angular [![Build Status](https://travis-ci.org/jeffcarp/braintree-angular.svg?branch=master)](https://travis-ci.org/jeffcarp/braintree-angular) [![npm version](http://img.shields.io/npm/v/braintree-angular.svg?style=flat)](https://www.npmjs.org/package/braintree-anguar) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A module for using [braintree-web](https://github.com/braintree/braintree-web) in your Angular app.

> Disclaimer: `braintree-angular` is not an official Braintree module.

**Big changes in version 2.0:**

- Angular 1.5 is required
- Bower is no longer supported
- You now must supply your own client token or tokenization key

Version 2.0 todo:

- [x] Support client tokens
- [x] Determine if hard requirement for 1.5 is ok
- [ ] Support more props (see braintree-react)
- [ ] Update README
- [ ] Put examples in gh-pages so we can link from README?

## Install

```bash
npm install braintree-angular
```

## Setup

```javascript
// this should work....
require('braintree-angular')
var yourApp = angular.module('yourApp', ['braintree-angular'])
```

(?) update to mention tokenization keys (?) Client tokens are generated with your Braintree server library. Here are guides on how to [set up the server library](https://developers.braintreepayments.com/sdk/server/setup) and how to [generate a client token](https://developers.braintreepayments.com/sdk/overview/generate-client-token).

### Drop-in UI

```html
<form action="/purchase" method="post">
  <braintree-dropin tokenization-key="your-tokenization-key"></braintree-dropin>

  <input type="submit" value="Buy for $14" />
</form>
```

For a running example, see [`dropin.html`](). (?) - maybe gh-pages :) ?

### PayPal Standalone Button

```html
<braintree-paypal tokenization-key=""></braintree-paypal>
```

For a running example, see [`paypal.html`](). (?) - maybe gh-pages :) ?

### onPaymentMethodReceived
