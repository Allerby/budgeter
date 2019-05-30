import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  allCategories: [],

  parentCategories: computed('categories', function() {
    return this.allCategories.filterBy('parent_category_id', null);
  }),

  iconMap(categoryName) {
    switch(categoryName) {
      case 'Income':
        return 'ic-salary';
      case 'Leisure':
        return 'ic-cinema';
      case 'Food & Drink':
        return 'ic-coffee';
      case 'Lifestyle':
        return 'ic-clothes';
      case 'Housing':
        return 'ic-rent';
      case 'Hobby':
        return 'ic_entertainment-copy';
      case 'Interest':
        return 'ic-interest';
      case 'Investments':
        return 'ic-investments';
      case 'Salary':
        return 'ic-salary';
      case 'Savings':
        return 'ic-savings';
      case 'Transfer':
        return 'ic-transfer';
      case 'Cinema':
        return 'ic-cinema';
      case 'Electronics':
        return 'ic-electronics';
      case 'Entertainment':
        return 'ic-entertainment';
      case 'Gym':
        return 'ic-gym';
      case 'Subscription':
        return 'ic-subscription';
      case 'Alcohol':
        return 'ic-alcohol';
      case 'Coffee':
        return 'ic-coffee';
      case 'Groceries':
        return 'ic-groceries';
      case 'Takeaways':
        return 'ic-takeaways';
      case 'Clothes':
        return 'ic-clothes';
      case 'Insurance':
        return 'ic-insurance';
      case 'Loan':
        return 'ic-loan';
      case 'Makeup':
        return 'ic-makeup';
      case 'Student Loan':
        return 'ic-studentloan';
      case 'Travel':
        return 'ic-travel';
      case 'Electricity':
        return 'ic-electricity';
      case 'Internet':
        return 'ic-internet';
      case 'Mortgage':
        return 'ic-rent';
      case 'Phone':
        return 'ic-phone';
      case 'Rent':
        return 'ic-rent';
      case 'Water':
        return 'ic-water'; 
      default:
        return 'ic-error';
    };
  },
});
