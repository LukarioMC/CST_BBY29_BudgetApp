function sayHello() {
    
}
//sayHello();

// name, price, cuisine, discountCode, actualPrice

const resName =[];
const price = [];
const cuisine = [];
const discountCode = [];
const actualPrice = [];

const resNameDB =[
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

function dataGeneration() {
  for (let i = 0; i < 9; i += 1) {
    const index = Math.floor(Math.random() * (9 - i))
    resName.push(resNameDB[index]);
    resNameDB.splice(index, 1);
  }

  for (let i = 0; i < 9; i += 1) {
    const index = Math.floor(Math.random() * (9 - i))
    cuisine.push(cuisineDB[index]);
    cuisineDB.splice(index, 1);
  }

  for (let i = 0; i < 9; i += 1) {
    const index = Math.floor(Math.random() * (9 - i))
    discountCode.push(discountCodeDB[index]);
    discountCodeDB.splice(index, 1);
  }

  console.log(resName);
  console.log(discountCode);
  console.log(cuisine);
  

}