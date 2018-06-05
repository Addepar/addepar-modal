import Component from '@ember/component';
import layout from '../../templates/components/adde-modal/adde-modal-body';

import { classNames } from '@ember-decorators/component';

@classNames('adde-modal-body')
export default class AddeModalBodyComponent extends Component {
  layout = layout;
}
