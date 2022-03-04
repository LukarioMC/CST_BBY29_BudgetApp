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

  console.log(resName);
  console.log(discountCode);
  console.log(cuisine);
  

}