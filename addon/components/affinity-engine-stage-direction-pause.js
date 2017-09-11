import Ember from 'ember';
import { DirectableComponentMixin } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';
import { EKMixin, keyUp } from 'ember-keyboard';

const {
  Component,
  get,
  getProperties,
  isPresent
} = Ember;

const { computed: { alias } } = Ember;
const { run: { later } } = Ember;

export default Component.extend(DirectableComponentMixin, EKMixin, {
  keyboardActivated: alias('isFocused'),

  didInsertElement(...args) {
    this._super(...args);

    const configuration = get(this, 'direction.configuration.attrs');

    const {
      duration,
      keys,
      promise
    } = getProperties(configuration, 'duration', 'keys', 'promise');

    const acceptKeys = get(keys, 'accept');

    if (isPresent(acceptKeys)) {
      this._setupKeyPressWatcher(acceptKeys);
    }

    if (isPresent(duration)) {
      later(() => {
        get(this, '_resolveTask').perform();
      }, duration);
    }

    if (isPresent(promise)) {
      promise.then(() => {
        get(this, '_resolveTask').perform();
      });
    }
  },

  willDestroyElement(...args) {
    this._super(...args);

    get(this, '_resolveTask').perform();
  },

  _resolve() {
    get(this, '_resolveTask').perform();
  },

  _resolveTask: task(function * () {
    yield this.resolveAndDestroy();
  }).drop(),

  _setupKeyPressWatcher(keys) {
    keys.forEach((key) => {
      this.on(keyUp(key), this._resolve);
    });
  }
});
