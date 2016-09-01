import Ember from 'ember';
import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';
import { hook } from 'ember-hook';

const { RSVP: { Promise } } = Ember;
const { run: { later } } = Ember;

export default Scene.extend({
  name: 'Pause Direction Test',

  start: task(function * (script) {
    const $data = Ember.$(hook('data'));

    yield step();

    yield script.pause(100);

    $data.text('1');

    yield step();

    yield script.pause('KeyA');

    $data.text('2');

    yield step();

    yield script.pause('KeyA', 100);

    $data.text('3');

    yield step();

    yield script.pause('KeyA', 100);

    $data.text('4');

    yield step();

    const promise = new Promise((resolve) => {
      later(() => {
        resolve();
      }, 100);
    });

    const instance = Ember.Object.create({
      promise
    });

    yield script.pause(instance);

    $data.text('5');
  })
});
