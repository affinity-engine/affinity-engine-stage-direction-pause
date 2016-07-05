import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { hook } from 'ember-hook';

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/pause', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | Director | Directions | Pause', function(assert) {
  assert.expect(10);

  visit('/affinity-engine/test-scenarios/stage/directions/pause').then(() => {
    return step();
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '', 'still awaiting');

    return delay(200);
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '1', 'waited 100ms');

    return step();
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '1', 'still waiting');

    return keyUp('KeyA');
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '2', 'waited until keyup');

    return step();
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '2', 'still waiting');

    return keyUp('KeyA');
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '3', 'waited until keyup, rather than 100ms');

    return step();
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '3', 'still waiting');

    return delay(300);
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '4', 'waited until 100ms, rather than keyup');

    return step();
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '4', 'still waiting');

    return delay(300);
  }).then(() => {
    assert.equal(Ember.$(hook('data')).text().trim(), '5', 'waited until promise resolved');
  });
});
