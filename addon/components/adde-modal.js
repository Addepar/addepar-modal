import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

import layout from '../templates/components/adde-modal';

import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';

export default class AddeModal extends ModalDialog {
  layout = layout;

  @argument
  targetAttachment = 'center';

  @argument
  confirmText = 'Confirm';

  @argument
  closeText = 'Cancel';

  @argument
  headerText = '';

  @argument
  size = 'normal';

  @computed('size')
  get sizeClass() {
    let size = this.get('size');
    if (size === 'large') {
      return 'size-lg';
    } else if (size === 'small') {
      return 'size-sm';
    } else {
      return '';
    }
  }
}
