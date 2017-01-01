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

  init(...args) {
    this._super(...args);

    if (get(this, 'priorSceneRecord') === '_RESOLVED') {
      this.resolveAndDestroy();
    }
  },

  didInsertElement(...args) {
    this._super(...args);

    const directable = get(this, 'directable');

    const {
      duration,
      keys,
      promise
    } = getProperties(directable, 'duration', 'keys', 'promise');

    if (isPresent(keys)) {
      this._setupKeyPressWatcher(keys);
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
    this.resolveAndDestroy();
  }).drop(),

  _setupKeyPressWatcher(keys) {
    keys.forEach((key) => {
      this.on(keyUp(key), this._resolve);
    });
  }
});
