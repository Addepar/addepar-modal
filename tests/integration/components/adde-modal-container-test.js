import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adde-modal-container', 'Integration | Component | adde-modal-container', {
  integration: true,
});

test('adde-modal-container renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#adde-modal-container}}
      template block text
    {{/adde-modal-container}}
  `);

  assert.equal(
    this.$()
      .parent()
      .find('.adde-modal')
      .text()
      .trim(),
    'template block text'
  );
});
