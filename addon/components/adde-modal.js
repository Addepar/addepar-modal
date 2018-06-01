import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';


import layout from '../templates/components/adde-modal';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { action, computed } from '@ember-decorators/object';
import { immutable } from '@ember-decorators/argument/validation';

export default class AddeModal extends ModalDialog {
  layout = layout;

  // ----- Arguments -----

  /**
   * Header text for the modal.
   */
  @type('string')
  @argument headerText = '';

  /**
   * Size of the modal. Can be either 'large', 'small', or 'normal'. Used to generate the
   * appropriate css class to dictate the modal size.
   * @see {sizeClass}
   */
  @type('string')
  @argument size = 'normal';

  /**
   * Whether to show the close button in the top right of the modal (inside the header).
   */
  @type('boolean')
  @argument showCloseButton = true;

  /**
   * Whether to show the translucent overlay over content behind the modal.
   */
  @type('boolean')
  @argument translucentOverlay = true;

  /**
   * Whether clicking the overlay should send the 'onClose' action.
   */
  @type('boolean')
  @argument clickOutsideToClose = true;

  /**
   * Whether pressing the 'Escape' key will send the 'onClose' action.
   */
  @type('boolean')
  @argument closeOnEscape = true;

  /**
   * Whether to show the footer, which contains the 'Confirm' and 'Cancel' buttons (if used).
   */
  @type('boolean')
  @argument showFooter = true;
  /**
   * Button text for the primary ('Confirm') button in the footer. The 'Confirm' button is not shown
   * if this property is null.
   */
  @type('string')
  @argument confirmText = 'Confirm';

  /**
   * Button text for the primary ('Cancel') button in the footer. The 'Cancel' button is not shown
   * if this property is null.
   */
  @type('string')
  @argument cancelText = 'Cancel';


  /**
   * Selector for the root element of the application which will have body listeners
   * attached to close on 'Escape' keydown (if enabled)
   */
  @immutable
  @argument
  @type('string')
  rootElementSelector = '.ember-application';


  // ----- Private Variables -----

  _rootElement = null;

  @type('string')
  _modalElementSelector = '.adde-modal';

  @type('string')
  _modalTitleSelector = '.adde-modal-title';

  _modalElement = null;

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
      `Using root element selector "${rootElementSelector}" found ${possibleRootElements.length} possible containers when there should be exactly 1`,
      possibleRootElements.length === 1
    );
    
    this._rootElement = possibleRootElements[0];
    this._rootElement.addEventListener('keydown', this._closeModalHandler);
    
    // Setup accessibility attributes
    let modalElementSelector = this.get('_modalElementSelector');
    this._modalElement = this._rootElement.querySelector(modalElementSelector);
    let modalTitleSelector = this.get('_modalTitleSelector');
    this._modalTitleElement = this._modalElement.querySelector(modalTitleSelector);

    let titleID = `${guidFor(this)}-modal-title`;
    this._modalTitleElement.setAttribute('id', titleID);
    
    this._modalElement.setAttribute('role', 'dialog');
    this._modalElement.setAttribute('aria-modal', 'true');
    this._modalElement.setAttribute('aria-labelledby', titleID);

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
    let focusableSelectors = 'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    let focusableElements = this._modalElement.querySelectorAll(focusableSelectors);
    return focusableElements;
  }

  /**
   * Sets focus when the modal first appears. Tries to focus the 'Confirm' button, 'Cancel' button,
   * and 'Close' button, in that order. If none are present, focuses the first focusable element.
   */
  _setInitialFocus() {
    let focusableElements = this._getFocusableElementsInPopper();
    
    // If the modal has no focusable elements, no need to do anything
    if (focusableElements.length === 0) {
      return;
    }

    let confirmButton = this._findElementInNodeListWithClass(focusableElements, 'adde-modal-confirm');
    if (confirmButton) {
      confirmButton.focus();
      return;
    }

    let cancelButton = this._findElementInNodeListWithClass(focusableElements, 'adde-modal-cancel');
    if (cancelButton) {
      cancelButton.focus();
      return;
    }
    
    let closeButton = this._findElementInNodeListWithClass(focusableElements, 'adde-modal-close');
    if (closeButton) {
      closeButton.focus();
      return;
    }

    focusableElements[0].focus();
  }

  _findElementInNodeListWithClass(nodeList, className) {
    return Array.from(nodeList).find(el => Array.from(el.classList).includes(className));
  }


  // ----- Actions -----

  /**
   * Action handler for when the 'Confirm' button is clicked. If there is no action defined for 
   * 'onConfirm', it will defer to the 'onClose' action.
   */
  @action
  onConfirm() {
    if (typeof this.get('onConfirm') === 'string') {
      this.sendAction('onConfirm');
    } else {
      this.send('onClose');
    }
  }

  /**
   * Action handler for when the 'Cancel' button is clicked. If there is no action defined for 
   * 'onCancel', it will defer to the 'onClose' action.
   */
  @action
  onCancel() {
    if (typeof this.get('onCancel') === 'string') {
      this.sendAction('onCancel');
    } else {
      this.send('onClose');
    }
  }

  /**
   * Action handler for when the translucent overlay is clicked. If there is no action defined for
   * 'onClickOverlay', it will defer to the 'onClose' action.
   */
  @action
  onClickOverlay() {
    if (!this.get('clickOutsideToClose')) {
      return;
    }
    if (typeof this.get('onClickOverlay') === 'string') {
      this.send('onClickOverlay');
    } else {
      this.send('onClose');
    }
  }

  /**
   * Action handler for when the 'Close' button is clicked, or when any of the above actions occur
   * and the corresponding action is not defined. If there is no action defined for 'onClose',
   * nothing happens.
   */
  @action
  onClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }


  // ----- Event Handlers -----
  
  _closeModalHandler = event => {
    if (!this.get('closeOnEscape')) {
      return;
    }
    
    let keyCode = event.key;

    if (keyCode === 'Escape') {
      this.send('onClose');
    }
  }
}
