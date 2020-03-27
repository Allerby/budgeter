import Component from '@ember/component';
import { tagName, classNames } from "@ember-decorators/component";

@tagName('li')
@classNames('flex mb-4 cursor-pointer')
export default class TransactionItem extends Component {
  selected = true;

  click() {
    this.onClick();
  }
}
