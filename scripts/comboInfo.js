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
          var userEmail = userDoc.data().email;
          var userSubEmail = userDoc.data().subemail;
          var userPhone = userDoc.data().phone;
          document.getElementById('comboName').innerHTML = details;
          //if the data fields are not empty, then write them in to the form.
          // if (userName != null) {
          //   document.getElementById("nameInput").value = userName;
          // }
          // if (userEmail != null) {
          //   document.getElementById("emailInput").value = userEmail;
          // }
          // if (userSubEmail != null) {
          //   document.getElementById("subEmailInput").value = userSubEmail;
          // }
          // if (userPhone != null) {
          //   document.getElementById("phoneInput").value = userPhone;
          // }
        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
updateComboInfo();
