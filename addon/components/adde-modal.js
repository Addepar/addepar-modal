import layout from '../templates/components/adde-modal';
import Component from '@ember/component';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { immutable } from '@ember-decorators/argument/validation';
import { classNames, tagName } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

@classNames('adde-modal-trigger-wrapper')
@tagName('')
export default class AddeModal extends Component {
  layout = layout;

  // ----- Arguments: adde-modal-container overrides -----

  /**
   * Size of the modal. Can be either 'large', 'small', or 'normal'. Used to generate the
   * appropriate css class to dictate the modal size.
   * @see {sizeClass}
   */
  @type('string')
  @argument
  size = 'normal';

  /**
   * Whether to show the translucent overlay over content behind the modal.
   */
  @type('boolean')
  @argument
  translucentOverlay = true;

  /**
   * Whether clicking the overlay should send the 'onClose' action.
   */
  @type('boolean')
  @argument
  clickOutsideToClose = true;

  @type(unionOf(null, 'string'))
  @argument
  onClickOverlay = null;

  /**
   * Whether pressing the 'Escape' key will send the 'onClose' action.
   */
  @type('boolean')
  @argument
  closeOnEscape = true;

  /**
   * Whether to show the close button in the top right of the modal (inside the header).
   */
  @type('boolean')
  @argument
  showCloseButton = true;

  /**
   * Selector for the root element of the application which will have body listeners
   * attached to close on 'Escape' keydown (if enabled)
   */
  @immutable
  @argument
  @type('string')
  rootElementSelector = '.ember-application';

  // ----- Arguments: adde-modal specific -----

  /**
   * Header text for the modal.
   */
  @type('string')
  @argument
  headerText = '';

  /**
   * Whether to show the footer, which contains the 'Confirm' and 'Cancel' buttons (if used).
   */
  @type('boolean')
  @argument
  showFooter = true;

  /**
   * Button text for the primary ('Confirm') button in the footer. The 'Confirm' button is not shown
   * if this property is null.
   */
  @type('string')
  @argument
  confirmText = 'Confirm';

  /**
   * Button text for the primary ('Cancel') button in the footer. The 'Cancel' button is not shown
   * if this property is null.
   */
  @type('string')
  @argument
  cancelText = 'Cancel';

  @type(unionOf(null, 'string'))
  @argument
  onConfirm = null;

  @type(unionOf(null, 'string'))
  @argument
  onCancel = null;

  @type(unionOf(null, 'string'))
  @argument
  onClose = null;

  // ----- Actions -----

  /**
   * Action handler for when the 'Confirm' button is clicked. If there is no action defined for
   * 'onConfirm', it will defer to the 'onClose' action.
   */
  @action
  sendConfirm() {
    if (typeof this.get('onConfirm') === 'string') {
      this.sendAction('onConfirm');
    } else {
      this.send('sendClose');
    }
  }

  /**
   * Action handler for when the 'Cancel' button is clicked. If there is no action defined for
   * 'onCancel', it will defer to the 'onClose' action.
   */
  @action
  sendCancel() {
    if (typeof this.get('onCancel') === 'string') {
      this.sendAction('onCancel');
    } else {
      this.send('sendClose');
    }
  }

  /**
   * Action handler for when the 'Close' button is clicked, or when any of the above actions occur
   * and the corresponding action is not defined. If there is no action defined for 'onClose',
   * nothing happens.
   */
  @action
  sendClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }

  @action
  sendClickOverlay() {
    if (typeof this.get('onClickOverlay') === 'string') {
      this.sendAction('onClickOverlay');
    } else {
      this.send('sendClose');
    }
  }
}
