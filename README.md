# braintree-angular [![Build Status](https://travis-ci.org/jeffcarp/braintree-angular.svg?branch=master)](https://travis-ci.org/jeffcarp/braintree-angular) [![npm version](http://img.shields.io/npm/v/braintree-angular.svg?style=flat)](https://www.npmjs.org/package/braintree-anguar) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A module for using [braintree-web](https://github.com/braintree/braintree-web) in your Angular app.

Note! As of version **2.0** Angular 1.5 is required and bower is no longer supported.

> Disclaimer: `braintree-angular` is not an official Braintree module.

Version 2.0 todo:

- [x] Support client tokens
- [ ] Support more props (see braintree-react)
- [x] Determine if hard requirement for 1.5 is ok
- [ ] Update README

## Install

```bash
npm install braintree-angular
```

## Run the example

```sh
git clone git@github.com:jeffcarp/braintree-angular.git
cd braintree-angular
npm install
npm run example
# Open localhost:8000/dropin.html
```

## Setup

```javascript
require('braintree-angular');
var yourApp = angular.module('yourApp', ['braintree-angular'])
```

(?) update to mention tokenization keys (?) Client tokens are generated with your Braintree server library. Here are guides on how to [set up the server library](https://developers.braintreepayments.com/sdk/server/setup) and how to [generate a client token](https://developers.braintreepayments.com/sdk/overview/generate-client-token).

### Drop-in UI

```html
<form action="/buy-something" method="post">
  <h1>Buy some things</h1>

  <braintree-dropin tokenization-key=""></braintree-dropin>

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
