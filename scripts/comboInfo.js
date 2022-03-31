const queryString = window.location.search;
let result = queryString.substring(4);
console.log(result);
// ?id=1oSoLcgg1pb3Qs5SH6PO


function updateComboInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

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
          document.getElementById('comboName').innerHTML = details;
          document.getElementById('originalPricePlaceholder').innerHTML = actualPrice;
          document.getElementById('newPricePlaceholder').innerHTML = discountedPrice;
          document.getElementById('differencePercentPlaceHolder').innerHTML = discountRatio * 100;
        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
updateComboInfo();
