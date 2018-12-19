let count = 0;

const randomBool = (chance) => Math.random() > 1-chance;

const newItem = (name, price, tags = []) => ({
  id: count++, // temp id, just to serve as a unique key
  name,
  price,
  tags,
  completed: false,
  listed: randomBool(.4),
});

export default({
  list: [],
  items: [
    newItem('Corn', '0.00', ['one', 'two', 'three']),
    newItem('Rice', '0.00', ['one']),
    newItem('Sausages', '0.00', []),
    newItem('Broccoli', '0.00', ['one']),
    newItem('Bread', '0.00', ['one', 'two']),
    newItem('Pasta', '0.00', ['one']),
    newItem('Chicken Breast', '0.00', []),
    newItem('Bagels', '0.00', []),
    newItem('Cheese', '0.00', ['one', 'two']),
    newItem('Hot Dogs', '0.00', ['three']),
    newItem('Carrots', '0.00', ['three', 'two']),
  ],
});
