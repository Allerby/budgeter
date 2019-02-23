import { helper } from '@ember/component/helper';

export function categoryColour(category) {
  // This should probably be recieved from the API on application init along with custom categories.
  let categories = {
    leisure: [
      'cinema',
      'electronics',
      'entertainment',
      'gym',
      'hobby',
      'subscription',
    ],
    food: [
      'alcohol',
      'coffee',
      'groceries',
      'takeaways',
    ],
    lifestyle: [
      'clothes',
      'insurance',
      'loan',
      'makeup',
      'student loan',
      'travel',
    ],
    housing: [
      'electricity',
      'housing',
      'internet',
      'mortgage',
      'phone',
      'rent',
      'water',
    ],
    income: [
      'income',
      'interest',
      'investments',
      'salary',
      'savings',
      'transfer',
    ],
  };
  let categoryColour;
  Object.entries(categories).forEach(([key, value]) => {
    if (value.includes(category.firstObject)) {
      categoryColour = key;
    }
  });
  return categoryColour;
}

export default helper(categoryColour);
