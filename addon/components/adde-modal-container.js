import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';

import layout from '../templates/components/adde-modal-container';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { immutable } from '@ember-decorators/argument/validation';
import { classNames, tagName } from '@ember-decorators/component';
import { action, computed } from '@ember-decorators/object';

@classNames('adde-modal-trigger')
@tagName('')
export default class AddeModalContainer extends ModalDialog {
  layout = layout;

  // ----- Arguments -----

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
   * Whether pressing the 'Escape' key will send the `onClose` action.
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
  @type('string')
  @immutable
  @argument
  rootElementSelector = '.ember-application';

  // ----- Private Variables -----

  /**
   * Root element, on which the event listener is added which sends the `onClose` action on 'Escape'
   * keydown.
   * @see didInsertElement
   */
  _rootElement = null;

  @type('string') _modalElementSelector = '.adde-modal';
  
  _modalElement = null;

  @type('string') _modalTitleSelector = '.adde-modal-title';

  /**
   * CSS class generated from `size` to alter the width of the modal. The default sizes are:
   *  - small:   400px
   *  - default: 600px
   *  - large:   800px
   */
  @type('string')
  @computed('size')
  get sizeClass() {
    switch (this.get('size')) {
      case 'large':
        return 'size-lg';
      case 'small':
        return 'size-sm';
      default:
        return '';
    }
  }

  // ----- Lifecycle Hooks -----

  didInsertElement() {
    this._super(...arguments);

    // Setup event listeners for keyboard support
    let rootElementSelector = this.get('rootElementSelector');
    let possibleRootElements = self.document.querySelectorAll(rootElementSelector);

    assert(
      `Using root element selector "${rootElementSelector}" found ${
        possibleRootElements.length
      } possible containers when there should be exactly 1`,
      possibleRootElements.length === 1
    );

    this._rootElement = possibleRootElements[0];
    this._rootElement.addEventListener('keydown', this._closeModalHandler);

    // ----- Accessibility -----
    // role, aria-modal
    let modalElementSelector = this.get('_modalElementSelector');
    this._modalElement = this._rootElement.querySelector(modalElementSelector);
    this._modalElement.setAttribute('role', 'dialog');
    this._modalElement.setAttribute('aria-modal', 'true');

    // aria-labelledby
    // Sets a unique ID on the modal title, and references this ID in the `aria-labelledby` attr
    // on the modal itself. If using the block template for {{adde-modal-header}} is used inside a
    // {{adde-modal-container}}, be sure to add the '.adde-modal-title' class to an appropriate
    // element so this is properly set up.
    let modalTitleSelector = this.get('_modalTitleSelector');
    this._modalTitleElement = this._modalElement.querySelector(modalTitleSelector);
    let titleID = `${guidFor(this)}-modal-title`;
    if (this._modalTitleElement) {
      this._modalTitleElement.setAttribute('id', titleID);
      this._modalElement.setAttribute('aria-labelledby', titleID);
    }

    // focus appropriate element upon modal instantiation
    this._setInitialFocus();
  }

  willDestroyElement() {
    this._super(...arguments);
    this._rootElement.removeEventListener('keydown', this._closeModalHandler);
  }

  // ----- Private Functions -----

  /**
   * Returns a node list of all focusable elements in the modal
   * @returns {NodeList}
   */
  _getFocusableElementsInPopper() {
    let focusableSelectors =
      'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    let focusableElements = this._modalElement.querySelectorAll(focusableSelectors);
    return focusableElements;
  }

  /**
   * Sets focus when the modal first appears. If `initialFocusClass` is set, it will focus the
   * corresponding element (if focusable). Otherwise, tries to focus the 'Confirm' button, then the
   * 'Cancel' button, then just the first focusable element in the modal.
   */
  _setInitialFocus() {
    let initialFocusClass = this.get('initialFocusClass');
    let focusableElements = this._getFocusableElementsInPopper();

    // If the modal has no focusable elements, no need to do anything
    if (focusableElements.length === 0) {
      return;
    }

    let initialFocusElement = this._findElementInNodeListWithClass(
      focusableElements,
      initialFocusClass
    );
    if (initialFocusElement) {
      initialFocusElement.focus();
      return;
    }

    let confirmButton = this._findElementInNodeListWithClass(
      focusableElements,
      'adde-modal-confirm'
    );
    if (confirmButton) {
      confirmButton.focus();
      return;
    }

    let cancelButton = this._findElementInNodeListWithClass(focusableElements, 'adde-modal-cancel');
    if (cancelButton) {
      cancelButton.focus();
      return;
    }

    focusableElements[0].focus();
  }

  _findElementInNodeListWithClass(nodeList, className) {
    return Array.from(nodeList).find(el => Array.from(el.classList).includes(className));
  }

  // ----- Actions -----

  /**
   * Action handler for when the overlay backdrop is clicked. If there is no action defined for
   * `onClickOverlay`, it will defer to the `onClose` action. Only triggered if 
   * `clickOverlayToClose` is true.
   */
  @action
  sendClickOverlay() {
    if (!this.get('clickOverlayToClose')) {
      return;
    }
    if (typeof this.get('onClickOverlay') === 'string') {
      this.sendAction('onClickOverlay');
    } else {
      this.send('sendClose');
    }
  }

  /**
   * Action handler for when the 'Close' ('X') button is clicked. Also the fallback action for
   * clicking 'Confirm', 'Cancel', or the overlay backdrop (if enabled). If there is no action 
   * defined for `onClose`, nothing happens.
   */
  @action
  sendClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }

  // ----- Event Handlers -----

  _closeModalHandler = event => {
    if (!this.get('escapeToClose')) {
      return;
    }

    let keyCode = event.key;

    if (keyCode === 'Escape') {
      this.send('sendClose');
    }
  };
}
