function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          //get the data fields of the user
          var userName = userDoc.data().name;
          var userEmail = userDoc.data().email;
          var userSubEmail = userDoc.data().subemail;
          var userPhone = userDoc.data().phone;
          console.log(userEmail);
          //if the data fields are not empty, then write them in to the form.
          if (userName != null) {
            document.getElementById("nameInput").value = userName;
          }
          if (userEmail != null) {
            document.getElementById("emailInput").value = userEmail;
          }
          if (userSubEmail != null) {
            document.getElementById("subEmailInput").value = userSubEmail;
          }
          if (userPhone != null) {
            document.getElementById("phoneInput").value = userPhone;
          }
        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
  document.getElementById('emailInput').disabled = true;
}

function saveUserInfo() {
  userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
  userEmail = document.getElementById('emailInput').value; //get the value of the field with id="schoolInput"
  userSubEmail = document.getElementById('subEmailInput').value; //get the value of the field with id="schoolInput"
  userPhone = document.getElementById('phoneInput').value; //get the value of the field with id="cityInput"
  currentUser.update({
      name: userName,
      email: userEmail,
      subemail: userSubEmail,
      phone: userPhone
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
  document.getElementById('personalInfoFields').disabled = true;
}