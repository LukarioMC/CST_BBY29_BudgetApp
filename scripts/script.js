const resName = [];
const cuisine = [];
const discountCode = [];
const comboCode = [];
const discountedPrice = [];
const discountRatio = [];
const actualPrice = [];

const resNameDB = [
  'Ramen',
  'Sandwitch',
  'Noodle',
  'Hamburger',
  'Sushi',
  'Fried Chicken',
  'Califonia roll',
  'Ribeye Stake',
  'Hawaiian Pizza',
  'Tomato Pasta'
];

const cuisineDB = [
  'Canadian',
  'Korean',
  'Japanese',
  'Chinese',
  'Italian',
  'American',
  'Indian',
  'Vietnamese',
  'German',
  'Australian'
];

const discountCodeDB = [
  'reflection5491',
  'population1887',
  'psychology5866',
  'comparison7894',
  'collection4791',
  'preference2217',
  'suggestion9631',
  'philosophy1841',
  'percentage7857',
  'assumption6632'
];

const comboCodeDB = [
  '15234',
  '86543',
  '75198',
  '35791',
  '87391',
  '97168',
  '51715',
  '96321',
  '17325',
  '25321'
];

const discountRatioDB = [
  0.02,
  0.04,
  0.06,
  0.08,
  0.10,
  0.13,
  0.16,
  0.19,
  0.22,
  0.25
];

const actualPriceDB = [
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50
];


function dataGeneration() {
  let j = resNameDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * resNameDB.length)
    resName.push(resNameDB[index]);
    resNameDB.splice(index, 1);
  }

  j = cuisineDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * cuisineDB.length)
    cuisine.push(cuisineDB[index]);
    cuisineDB.splice(index, 1);
  }

  j = discountCodeDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * discountCodeDB.length)
    discountCode.push(discountCodeDB[index]);
    discountCodeDB.splice(index, 1);
  }

  j = comboCodeDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * comboCodeDB.length)
    comboCode.push(comboCodeDB[index]);
    comboCodeDB.splice(index, 1);
  }

  j = discountRatioDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * discountRatioDB.length)
    discountRatio.push(discountRatioDB[index]);
    discountRatioDB.splice(index, 1);
  }

  j = actualPriceDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * actualPriceDB.length)
    actualPrice.push(actualPriceDB[index]);
    actualPriceDB.splice(index, 1);
  }

  j = actualPrice.length;
  for (let i = 0; i < j; i += 1) {
    let discounted = actualPrice[i] * discountRatio[i];
    discountedPrice.push(actualPrice[i] - discounted);
  }

  console.log(resName);
  console.log(discountCode);
  console.log(cuisine);
  console.log(comboCode);
  console.log(discountRatio);
  console.log(actualPrice);
  console.log(discountedPrice);
}

function writeData() {
  var dataRef = db.collection("combos");
  for (let i = 0; i < resName.length; i += 1) {
    dataRef.add({
      name: resName[i],
      cuisine: cuisine[i],
      discountCode: discountCode[i],
      actualPrice: actualPrice[i],
      discountRatio: discountRatio[i],
      discountedPrice: discountedPrice[i],
    });
  }
}


