import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerETTestHelpers from './affinity-engine/stage/register-test-helpers';
import keyboardRegisterTestHelpers from './ember-keyboard/register-test-helpers';

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override
  let attributes = Ember.assign({}, config.APP, attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    registerETTestHelpers();
    keyboardRegisterTestHelpers();
    application.injectTestHelpers();
  });

  return application;
}
