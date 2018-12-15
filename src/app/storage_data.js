let count = 0;

const newItem = (name, price) => ({
  id: count++, // temp id, just to serve as a unique key
  name, price
});

export default({
  items: [
    newItem('Corn', '0.00'),
    newItem('Rice', '0.00'),
    newItem('Sausages', '0.00'),
    newItem('Broccoli', '0.00'),
    newItem('Bread', '0.00'),
    newItem('Pasta', '0.00'),
    newItem('Chicken Breast', '0.00'),
    newItem('Bagels', '0.00'),
    newItem('Cheese', '0.00'),
    newItem('Hot Dogs', '0.00'),
    newItem('Carrots', '0.00'),
  ],
});
