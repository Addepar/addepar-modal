/* eslint-env node */
'use strict';

module.exports = {
  name: '@addepar/modal',
  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  }
};
