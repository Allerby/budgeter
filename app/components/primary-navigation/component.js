import { classNames } from "@ember-decorators/component";
import { inject as service } from "@ember/service";
import Component from '@ember/component';

@classNames('h-16 w-full flex flex-row items-center bg-white border-solid border-shade-3')
export default class PrimaryNavigation extends Component {
  @service()
  router;
}
