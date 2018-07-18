import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adde-modal', 'Integration | Component | adde-modal', {
  integration: true,
});

test('modal works', async function(assert) {
  // PLACEHOLDER TEST
  assert.expect(1);

  this.render(hbs`
    {{#adde-modal}}
      template block text
    {{/adde-modal}}
  `);

  assert.equal(
    this.$()
      .parent()
      .find('.adde-modal-body')
      .text()
      .trim(),
    'template block text'
  );
});
