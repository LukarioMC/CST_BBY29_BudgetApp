// Populates the users information in the form
populateInfo();

//=============================================================================
// Populates form fields with the current users information. Called on page 
// load.
//=============================================================================
function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {

      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid)
      //get the document for current user.
      currentUser.get().then(userDoc => {
        //get the data fields of the user
        let userName = userDoc.data().name;
        let userEmail = userDoc.data().email;
        let userSubEmail = userDoc.data().subemail;
        let userPhone = userDoc.data().phone;
        let userBudget = userDoc.data().budget;
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
        if (userBudget != null) {
          document.querySelectorAll("#budgetInput>option").forEach(option => {
            if (option.value == userBudget) {
              option.setAttribute("selected", "true");
            }
          });
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//=============================================================================
// Enables the personal info fields to be editable, called when user clicks on
// the "edit" button.
//=============================================================================
function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
  document.getElementById('emailInput').disabled = true;
}

//=============================================================================
// Saves the personal info fields for the current user, and disables form
// fields to prevent user edits. Calls when user clicks on the "save" button.
//=============================================================================
function saveUserInfo() {
  userName = document.getElementById('nameInput').value;
  userEmail = document.getElementById('emailInput').value;
  // Secondary email allowed to be edited to avoid the "reset login" authentication process.
  userSubEmail = document.getElementById('subEmailInput').value;
  userPhone = document.getElementById('phoneInput').value;
  userBudget = document.getElementById('budgetInput').value;
  currentUser.update({
    name: userName,
    email: userEmail,
    subemail: userSubEmail,
    phone: userPhone,
    budget: userBudget
  }).then(() => {
    console.log("Document successfully updated!");
  })
  document.getElementById('personalInfoFields').disabled = true;
}