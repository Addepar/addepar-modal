import Component from '@ember/component';
import layout from '../../templates/components/adde-modal/adde-modal-footer';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

@classNames('adde-modal-footer')
export default class AddeModalFooterComponent extends Component {
  layout = layout;

  @type('string')
  @argument
  confirmText = 'Confirm';

  @type('string')
  @argument
  cancelText = 'Cancel';

  @type(unionOf(null, 'string'))
  @argument
  onConfirm = null;

  @type(unionOf(null, 'string'))
  @argument
  onCancel = null;

  @action
  sendConfirm() {
    if (typeof this.get('onConfirm') === 'string') {
      this.sendAction('onConfirm');
    }
  }

  @action
  sendCancel() {
    if (typeof this.get('onCancel') === 'string') {
      this.sendAction('onCancel');
    }
  }
}
