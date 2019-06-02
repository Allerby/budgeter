import { tagName } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from '@ember/component';

@tagName('')
export default class Icon extends Component {
  @service()
  categories;

  @computed('name')
  get icon() {
    return this.categories.iconMap(this.categoryName);
  }
}
