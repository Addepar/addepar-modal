import Controller from '@ember/controller';

import { argument } from '@ember-decorators/argument';
import { action } from '@ember-decorators/object';

export default class ApplicationController extends Controller {
  @argument isShowingModal = false;

  @argument isShowingOtherModal = false;

  @action
  showModal() {
    this.set('isShowingModal', true);
  }

  @action
  showOtherModal() {
    this.set('isShowingOtherModal', true);
  }

  @action
  hideModal() {
    this.set('isShowingModal', false);
  }

  @action
  hideOtherModal() {
    this.set('isShowingOtherModal', false);
  }
}
