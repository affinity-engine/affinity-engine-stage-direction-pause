import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  get,
  typeOf
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-pause',

  config: multiton('affinity-engine/config', 'engineId'),

  _configurationTiers: [
    'component.stage.direction.pause',
    'component.stage.direction.every',
    'component.stage.every',
    'children'
  ],

  _setup: cmd({ async: true, render: true }, function(...args) {
    args.forEach((arg) => {
      switch (typeOf(arg)) {
        case 'string': return (this.getConfiguration('keys.accept') || this.configure('keys', { accept: [] }).accept).push(arg);
        case 'number': return this.configure('duration', arg);
        case 'instance': return this.configure('promise', get(arg, 'promise'));
      }
    });
  })
});
