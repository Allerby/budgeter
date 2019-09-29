import { tagName } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { iconMap } from 'budgeter/helpers/icon-map';

@tagName('')
export default class Icon extends Component {

  @computed('name')
  get icon() {
    return iconMap(this.categoryName);
  }
}
