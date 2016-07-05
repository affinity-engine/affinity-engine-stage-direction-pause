import Ember from 'ember';
import { Scene, step } from 'affinity-engine-stage';
import { hook } from 'ember-hook';

const { RSVP: { Promise } } = Ember;
const { run: { later } } = Ember;

export default Scene.extend({
  name: 'Pause Direction Test',

  start: async function(script) {
    await step();

    const $data = Ember.$(hook('data'));

    await script.pause(100);

    $data.text('1');

    await step();

    await script.pause('KeyA');

    $data.text('2');

    await step();

    await script.pause('KeyA', 100);

    $data.text('3');

    await step();

    await script.pause('KeyA', 100);

    $data.text('4');

    await step();

    const promise = new Promise((resolve) => {
      later(() => {
        resolve();
      }, 100);
    });

    const instance = Ember.Object.create({
      promise
    });

    await script.pause(instance);

    $data.text('5');
  }
});
