import { computed } from "@ember/object";
import Service from '@ember/service';

export default class Categories extends Service {
  allCategories = [];

  @computed('categories')
  get parentCategories() {
    return this.allCategories.filterBy('parent_category_id', null);
  }
}
