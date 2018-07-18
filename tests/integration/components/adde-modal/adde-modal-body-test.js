import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adde-modal-body', 'Integration | Component | adde-modal-body', {
  integration: true,
});

test('adde-modal-body renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#adde-modal-body}}
      template block text
    {{/adde-modal-body}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
