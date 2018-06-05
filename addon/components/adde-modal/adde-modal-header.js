import Component from '@ember/component';
import layout from '../../templates/components/adde-modal/adde-modal-header';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

@classNames('adde-modal-header')
export default class AddeModalHeaderComponent extends Component {
  layout = layout;

  // ----- Arguments -----

  /**
   * Action sent upon clicking the 'X' button in the top-right corner of the header.
   */
  @type(unionOf(null, 'string'))
  @argument
  onClose = null;

  /**
   * Header text.
   */
  @type('string')
  @argument
  headerText = '';

  /**
   * Whether the 'X' button should be shown.
   */
  @type('boolean')
  @argument
  showCloseButton = true;

  // ----- Actions -----
  
  /**
   * Action handler for clicking the 'X' button in the top-right corner of the header..
   */
  @action
  sendClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }
}
