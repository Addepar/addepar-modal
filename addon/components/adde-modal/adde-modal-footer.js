import Component from '@ember/component';
import layout from '../../templates/components/adde-modal/adde-modal-footer';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

@classNames('adde-modal-footer')
export default class AddeModalFooterComponent extends Component {
  layout = layout;

  // ----- Arguments -----

  /**
   * Button text for the primary ('Confirm') button in the footer. The 'Confirm' button is not shown
   * if this property is null.
   */
  @type(unionOf(null, 'string'))
  @argument
  confirmText = 'Confirm';

  /**
   * Button text for the primary ('Cancel') button in the footer. The 'Cancel' button is not shown
   * if this property is null.
   */
  @type(unionOf(null, 'string'))
  @argument
  cancelText = 'Cancel';

  /**
   * Action sent upon clicking the 'Confirm' button
   */
  @type(unionOf(null, 'string'))
  @argument
  onConfirm = null;

  /**
   * Action sent upon clicking the 'Cancel' button.
   */
  @type(unionOf(null, 'string'))
  @argument
  onCancel = null;

  // ----- Actions -----

  /**
   * Action handler for when the 'Confirm' button is clicked.
   */
  @action
  sendConfirm() {
    if (typeof this.get('onConfirm') === 'string') {
      this.sendAction('onConfirm');
    }
  }

  /**
   * Action handler for when the 'Cancel' button is clicked.
   */
  @action
  sendCancel() {
    if (typeof this.get('onCancel') === 'string') {
      this.sendAction('onCancel');
    }
  }
}
