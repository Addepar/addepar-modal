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

  // ----- Arguments: passed into adde-modal-container -----

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
   * Whether clicking the overlay should send the `onClose` action.
   */
  @type('boolean')
  @argument
  clickOverlayToClose = true;

  /**
   * Action sent upon clicking the overlay; only sent if `clickOverlayToClose` is true
   */
  @type(unionOf(null, 'string'))
  @argument
  onClickOverlay = null;

  /**
   * Whether pressing the 'Escape' key will send the 'onClose' action.
   */
  @type('boolean')
  @argument
  escapeToClose = true;

  /**
   * Selector string for the element that should be focused upon modal instantiation. If not
   * specified, it will try to focus 'Confirm' button, then 'Cancel' button, then the first
   * focusable element, in that order.
   */
  @type(unionOf(null, 'string'))
  @immutable
  @argument
  initialFocusClass = null;

  /**
   * Selector for the root element of the application which will have body listeners
   * attached to close on 'Escape' keydown (if enabled)
   */
  @immutable
  @argument
  @type('string')
  rootElementSelector = '.ember-application';

  /**
   * Class names added to the modal itself.
   */
  @argument containerClassNames = [];

  /**
   * Class names added to the transparent overlay.
   */
  @argument overlayClassNames = [];

  /**
   * Class names added to the overlay wrapper.
   */
  @argument wrapperClassNames = [];

  /**
   * Target that serves as the reference for modal position.
   */
  @argument target = 'body';

  /**
   * When true, renders the modal without use of a wormhole.
   */
  @argument renderInPlace = false;

  /**
   * String of the form 'vert-attachment horiz-attachment' for positioning.
   */
  @argument targetAttachment = 'middle center';

  // ----- Arguments: adde-modal specific -----

  /**
   * Header text for the modal.
   */
  @type('string')
  @argument
  headerText = '';

  /**
   * Whether to show the close button in the top right of the modal (inside the header).
   */
  @type('boolean')
  @argument
  showCloseButton = true;

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
   * Action sent upon clicking the 'Confirm' button.
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

  /**
   * Action sent upon closing the modal, either by clicking the 'X' button in top-right, clicking
   * the overlay (if `clickOverlayToClose` is true), or pressing the Escape key (if `escapeToClose`
   * is true).
   */
  @type(unionOf(null, 'string'))
  @argument
  onClose = null;

  // ----- Actions -----

  /**
   * Action handler for when the 'Confirm' button is clicked. If there is no action defined for
   * `onConfirm`, it will defer to the `onClose` action.
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
   * `onCancel`, it will defer to the `onClose` action.
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
   * Action handler for when the overlay backdrop is clicked. If there is no action defined for
   * `onClickOverlay`, it will defer to the `onClose` action. Only triggered if
   * `clickOverlayToClose` is true. Bubbled up from the adde-modal-container.
   */
  @action
  sendClickOverlay() {
    if (typeof this.get('onClickOverlay') === 'string') {
      this.sendAction('onClickOverlay');
    } else {
      this.send('sendClose');
    }
  }

  /**
   * Action handler for when the 'Close' ('X') button is clicked. Also the fallback action for
   * clicking 'Confirm', 'Cancel', or the overlay backdrop (if enabled). If there is no action
   * defined for `onClose`, nothing happens. Bubbled up from the adde-modal-container.
   */
  @action
  sendClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }
}
