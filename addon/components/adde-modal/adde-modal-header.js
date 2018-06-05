import Component from '@ember/component';
import layout from '../../templates/components/adde-modal/adde-modal-header';

import { argument } from '@ember-decorators/argument';
import { type, unionOf } from '@ember-decorators/argument/type';
import { classNames } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';

@classNames('adde-modal-header')
export default class AddeModalHeaderComponent extends Component {
  layout = layout;

  @type(unionOf(null, 'string'))
  @argument
  onClose = null;

  @type('string')
  @argument
  headerText = '';

  @type('boolean')
  @argument
  showCloseButton = true;

  @action
  sendClose() {
    if (typeof this.get('onClose') === 'string') {
      this.sendAction('onClose');
    }
  }
}
