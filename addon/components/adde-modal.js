import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

import { argument } from '@ember-decorators/argument';

export default class AddeModal extends ModalDialog {
  @argument
  targetAttachment = 'center';
}
