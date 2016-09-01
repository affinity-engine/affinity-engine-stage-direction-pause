import Ember from 'ember';
import { configurable } from 'affinity-engine';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  computed,
  get,
  set,
  typeOf
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-pause',
  layer: 'meta.pause',

  config: multiton('affinity-engine/config', 'engineId'),

  _configurationTiers: [
    'attrs',
    'config.attrs.component.stage.direction.pause'
  ],

  _directableDefinition: computed('_configurationTiers', {
    get() {
      const configurationTiers = get(this, '_configurationTiers');

      return {
        duration: configurable(configurationTiers, 'duration'),
        keys: configurable(configurationTiers, 'keys.accept'),
        promise: configurable(configurationTiers, 'promise')
      }
    }
  }),

  _setup: cmd({ async: true, directable: true }, function(...args) {
    args.forEach((arg) => {
      switch (typeOf(arg)) {
        case 'string': return (get(this, 'attrs.keys.accept') || set(this, 'attrs.keys', { accept: [] }).accept).push(arg);
        case 'number': return set(this, 'attrs.duration', arg);
        case 'instance': return set(this, 'attrs.promise', get(arg, 'promise'));
      }
    });
  })
});
