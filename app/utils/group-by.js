export default function groupBy(list, keyGetter) {
  let obj = Object.create(null);
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = obj[key];
    if (!collection) {
      obj[key] = [item]
    } else {
      collection.push(item);
    }
  });
  return obj;
}
