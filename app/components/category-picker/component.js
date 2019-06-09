import { action } from "@ember/object";
import { classNames } from "@ember-decorators/component";
import { inject as service } from "@ember/service";
import Component from '@ember/component';

@classNames('pin-l pin-t absolute h-full w-full flex justify-center md:ml-24 flex-col')
export default class CategoryPicker extends Component {
  @service()
  categories;

  @service()
  router;

  @action
  selectCategory(category) {
    if (category == this.selectedCategory) {
      this.set('selectedCategory', undefined);
    } else {
      this.set('selectedCategory', category)
    }
  }

  @action
  closeCategories() {
    this.router.transitionTo({ queryParams: { selectCategory: false }});
  }
}
