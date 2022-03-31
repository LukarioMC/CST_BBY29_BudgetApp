const queryString = window.location.search;
let result = queryString.substring(4);
let restaurant;

function updateComboInfo() {
  //go to the correct user document by referencing to the user uid
  currentUser = db.collection("combos").doc(result)
  //get the document for current user.
  currentUser.get()
    .then(userDoc => {
      //get the data fields of the user
      var details = userDoc.data().details;
      var actualPrice = userDoc.data().actualPrice;
      var discountedPrice = userDoc.data().discountedPrice;
      var discountRatio = userDoc.data().discountRatio;
      restaurant = userDoc.data().restaurant;
      document.getElementById('comboName').innerHTML = details;
      document.getElementById('originalPricePlaceholder').innerHTML = actualPrice;
      document.getElementById('newPricePlaceholder').innerHTML = discountedPrice;
      document.getElementById('differencePercentPlaceHolder').innerHTML = discountRatio * 100;
      document.getElementById('restaurantInfoPlaceholder').innerHTML = restaurant;
    })

  var delayInMilliseconds = 2000; //2 second

  setTimeout(function () {
    console.log("restaurant");
    console.log(restaurant);
    currentUser = db.collection("restaurants").doc(restaurant)
    //get the document for current user.
    currentUser.get()
      .then(userDoc => {
        //get the data fields of the user
        var address = userDoc.data().address;
        var telephone = userDoc.data().telephone;
        var website = userDoc.data().website;
        console.log(address);
        console.log(telephone);
        console.log(website);
        document.getElementById('addressPlaceholder').innerHTML = address;
        document.getElementById('telephonePlaceholder').innerHTML = telephone;
        document.getElementById('websitePlaceholder').innerHTML = website;
      })
  }, delayInMilliseconds);
}

updateComboInfo();



