import Controller from '@ember/controller';

import { argument } from '@ember-decorators/argument';
import { action } from '@ember-decorators/object';

export default class ApplicationController extends Controller {
  @argument isShowingModal = false;

  @action
  showModal() {
    this.set('isShowingModal', true);
  }

  @action
  hideModal() {
    this.set('isShowingModal', false);
  }
}
