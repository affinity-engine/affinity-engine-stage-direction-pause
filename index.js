/* jshint node: true */
'use strict';

function getParentApp(app) {
  if (typeof app.import !== 'function' && app.app) {
    return getParentApp(app.app);
  } else {
    return app;
  }
}

module.exports = {
  name: 'ember-theater-director-pause',

  included: function(app) {
    this._super.included(app);

    this.eachAddonInvoke('safeIncluded', [app]);

    app = getParentApp(app);
  },

  safeIncluded: function(app, parent) {
    this.included(app, parent);
  }
};
