const queryString = window.location.search;
let result = queryString.substring(4);
let restaurant;

function updateComboInfo() {
  //go to the correct user document by referencing to the user uid
  currentUser = db.collection("combos").doc(result)
  //get the document for current user.
  currentUser.get()
    .then(comboDoc => {
      let comboData = comboDoc.data();
      //get the data fields of the user
      var details = comboData.details;
      var actualPrice = parseFloat(comboData.actualPrice).toFixed(2);
      var discountedPrice = parseFloat(comboData.discountedPrice).toFixed(2);
      var discountRatio = parseFloat(comboData.discountRatio).toFixed(1);
      restaurant = comboData.restaurant;
      document.getElementById('comboName').innerHTML = details;
      document.getElementById('originalPricePlaceholder').innerHTML = actualPrice;
      document.getElementById('newPricePlaceholder').innerHTML = discountedPrice;
      document.getElementById('differencePercentPlaceHolder').innerHTML = discountRatio * 100;
      document.getElementById('restaurantInfoPlaceholder').innerHTML = restaurant;
      if(comboData.image != null) {
        document.getElementById('comboImage').src = comboData.image;
      }
      
      console.log("Restaurant:", restaurant);
      currentRestaurant = db.collection("restaurants").doc(restaurant)
      //get the document for current Restaurant.
      currentRestaurant.get()
        .then(resDoc => {
          //get the data fields for the current restaurant
          console.log(resDoc);
          var resData = resDoc.data()
          var address = resData.address;
          var telephone = resData.telephone;
          var website = resData.website;
          
          console.log(address, telephone, website);
          
          document.getElementById('addressPlaceholder').innerHTML = address;
          document.getElementById('telephonePlaceholder').innerHTML = telephone;
          document.getElementById('websitePlaceholder').innerHTML = website;
      });
    });
}

updateComboInfo();
