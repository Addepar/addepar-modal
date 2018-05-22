import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import layout from '../templates/components/adde-modal';

export default class AddeModal extends ModalDialog {
  layout = layout;

  targetAttachment = 'center';
}
