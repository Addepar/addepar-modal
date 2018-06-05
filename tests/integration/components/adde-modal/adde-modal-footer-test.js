import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adde-modal-footer', 'Integration | Component | adde-modal-footer', {
  integration: true,
});

test('adde-modal-footer renders', function(assert) {
  assert.expect(1);

  // Template block usage:
  this.render(hbs`
    {{#adde-modal-footer}}
      template block text
    {{/adde-modal-footer}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
