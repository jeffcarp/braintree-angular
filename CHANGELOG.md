For changes to `braintree-web`, please see [braintree-web/CHANGELOG.md](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md).

# Unreleased

- Breaking changes in version 2!
  - Move to using `angular.component` - requires Angular 1.5
  - Now uses braintree-web v3(?)
  - No longer includes a built version in the `dist` directory
  - Removes functionality to fetch client tokens, you must now pass in a client token or a tokenization key as a property

# `1.4.1`

- Properly use dependency injection syntax for `braintree-paypal` directive (jlforever) #48

# `1.4.0`

- Upgraded `braintree-web` to [2.24.0](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md#2240)
- Transitioned to [Standard JS style](http://standardjs.com/)

# `1.3.1`

- Fixed `restrict` property on directives (gambry)

# `1.3.0`

- Added `braintree-paypal` integration method
