let count = 0;

const randomBool = (chance) => Math.random() > 1-chance;

const newItem = (name, price, tags = []) => ({
  id: count++, // temp id, just to serve as a unique key
  name,
  price,
  tags ,
  completed: false,
  listed: randomBool(.4),
});

let tagCount = 0;
const newTag = (name) => ({
  id: tagCount++, // temp id, just to serve as a unique key
  name,
  items: [],
  color: 'blueviolet'
});

const tags = [
  newTag('Grocery Store'),  // id 0
  newTag('Vegetables'),     // id 1
  newTag('Meat'),           // id 2
  newTag('Bread'),          // id 3
  newTag('General Store'),  // id 4
  newTag('Tools'),          // id 5
  newTag('Cleaning'),       // id 6
];

export default({
  items: [
    newItem('Corn', '0.00', [0, 1]),
    newItem('Rice', '0.00', [0, ]),
    newItem('Sausages', '0.00', [0, 2]),
    newItem('Broccoli', '0.00', [0, 1]),
    newItem('Bread', '0.00', [0, 3]),
    newItem('Pasta', '0.00', [0, ]),
    newItem('Chicken Breast', '0.00', [0, 2]),
    newItem('Bagels', '0.00', [0, 3]),
    newItem('Cheese', '0.00', [0, ]),
    newItem('Hot Dogs', '0.00', [0, 2]),
    newItem('Carrots', '0.00', [0, 1]),

    newItem('Pliers', '0.00', [4, 5]),
    newItem('Detergent', '0.00', [4, 6]),
    newItem('Glass cleaner', '0.00', [4, 6]),
    newItem('Drill', '0.00', [4, 5]),
    newItem('Dish soap', '0.00', [4, 6]),
  ],
  tags
});
