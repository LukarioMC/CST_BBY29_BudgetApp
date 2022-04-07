const queryString = window.location.search;
let result = queryString.substring(4); // Gets the ID to display the combo
let restaurant;

//===================================================================
//  This function updates the individual combo information page to 
//  display it's proper values.
//===================================================================
function updateComboInfo() {
  // Go to the correct combo document by referencing to the combo uid
  currentCombo = db.collection("combos").doc(result)
  // Get the document for current combo.
  currentCombo.get()
    .then(comboDoc => {
      let comboData = comboDoc.data();
      // Get the data fields of the combo
      var details = comboData.details;
      // Parse numbers as floats and add fixed decimal points
      var actualPrice = parseFloat(comboData.actualPrice).toFixed(2);
      var discountedPrice = parseFloat(comboData.discountedPrice).toFixed(2);
      var discountRatio = parseFloat(comboData.discountRatio).toFixed(1);
      restaurant = comboData.restaurant;

      // Sets the values to the retrieved values
      document.getElementById('comboName').innerHTML = details;
      document.getElementById('originalPricePlaceholder').innerHTML = actualPrice;
      document.getElementById('newPricePlaceholder').innerHTML = discountedPrice;
      document.getElementById('differencePercentPlaceHolder').innerHTML = discountRatio * 100;
      document.getElementById('restaurantInfoPlaceholder').innerHTML = restaurant;
      if (comboData.image != null) { // Some images may not exist for testing purposes.
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

// Run the function immediately
updateComboInfo();
