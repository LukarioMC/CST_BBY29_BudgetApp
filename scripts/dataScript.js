// Generates dummy raw data of restaurants.
// Writes the data into Firebase. 

/*
Data Structure for reference

“name” : “{Combo Name}”
    “details” : “{Description of combo}”
    “cuisine” : “{Style of cuisine}”
    “restaurant” : “{restaurantID}”
    “discountCode” : {Restaurants provided code}
    “actualPrice” : {Price user WOULD have paid}
    “discountedPrice” : {Price user pays}
    “discountRatio” : {Ratio of discount, calculated when restaurant submits}
    “comments”
      {user’s UID}
        “name” : “{User’s name}”
        “rating” : “{Rating}”
        “comment” : “{Comment content}”
        “timestamp” : “{Timestamp}”
users
  {userID}
    “name” : “{Users name}”
    “email” : “{Users email}”
    “budget” : {Given budget}
    “combo1” : “{Generated combo code}”
    “combo2” : “{Generated combo code}”
    “combo3” : “{Generated combo code}”
    “lastUpdated” : {Time stamp}
    “favorites” : [ {Array of combo codes} ]

restaurants
  {restaurantID}
    “name” : “{Restaurant Name}”
    “address” : “{Restaurant Address}”
    “website” : “{Restaurant Website}”
    “telephone” : “{Phone Number}”
*/

const details = [];
const cuisine = [];
const resName = [];
const resAddr = [];
const resWeb = [];
const resTel = [];
const discountCode = [];
const discountRatio = [];
const actualPrice = [];
const discountedPrice = [];
const comboName =[];

const detailsDB = [
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

const resNameDB = [
  `Lily's Kitchen`,
  'Jejudo',
  'Pho99',
  'The Golden Boot',
  'Ijakaya',
  `Kook's Cooks`,
  'Loughhheed Grill & Fish',
  'Mr. Hamburger',
  'Rick & Jane',
  'Italiano'
];

const resAddrDB = [
  '2540 Shaughnessy St. #102',
  '341 North Rd.',
  '1147 Austin Ave.',
  '1143 Austin Ave.',
  '1655 Como Lake Ave.',
  '228 Schoolhouse St.',
  '1046 Austin Ave Unit D',
  '1090 Lougheed Hwy.',
  '1043 Brunette Ave.',
  '91 Golden Dr'
]

const resTelDB = [
  '(604)526-9875',
  '(604)358-5745',
  '(778)622-9874',
  '(604)231-9954',
  '(604)369-7841',
  '(778)211-4126',
  '(604)934-4236',
  '(604)178-5218',
  '(604)974-1357',
  '(778)477-6654'
]

// need to think about it.
const resWebDB = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

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

const comboNameDB = [
  'ComboA',
  'ComboB',
  'ComboC',
  'ComboD',
  'ComboE',
  'ComboF',
  'ComboG',
  'ComboH',
  'ComboI',
  'ComboJ'
];

let arr = [];
let arrDB = [];

function shuffle(arr, arrDB) {
  let j = arrDB.length;
  for (let i = 0; i < j; i += 1) {
    const index = Math.floor(Math.random() * arrDB.length)
    arr.push(arrDB[index]);
    arrDB.splice(index, 1);
  }
}

function dataGeneration() {
  shuffle(details, detailsDB);
  shuffle(cuisine, cuisineDB);
  shuffle(resName, resNameDB);
  shuffle(resAddr, resAddrDB);
  shuffle(resTel, resTelDB);
  shuffle(resWeb, resWebDB);
  shuffle(discountCode, discountCodeDB);
  shuffle(actualPrice, actualPriceDB);
  shuffle(discountRatio, discountRatioDB);
  shuffle(comboName, comboNameDB);
  // discounted price
  j = actualPrice.length;
  for (let i = 0; i < j; i += 1) {
    let discounted = actualPrice[i] * discountRatio[i];
    discountedPrice.push(actualPrice[i] - discounted);
  }
  console.log(resName);
  console.log(discountCode);
  console.log(cuisine);
  console.log(discountRatio);
  console.log(actualPrice);
  console.log(discountedPrice);
}

function writeData() {
  var dataRef = db.collection("combos");
  for (let i = 0; i < resName.length; i += 1) {
    dataRef.add({
      details: details[i],
      cuisine: cuisine[i],
      restaurant: resName[i],
      discountCode: discountCode[i],
      actualPrice: actualPrice[i],
      discountRatio: discountRatio[i],
      discountedPrice: discountedPrice[i],
    });
  }
}

function writeComment() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here: 
      console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          //method #1:  insert with html only
          //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
          //method #2:  insert using jquery
          console.log(user.uid);

          // TO DO: code for writing comments data into Firebase using UID data above.
        })
    } else {
      // No user is signed in.
    }
  });
}