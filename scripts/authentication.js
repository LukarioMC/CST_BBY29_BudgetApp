// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var landingPage = "index.html";

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      // The code below is modified from default snippet provided by the FB documentation.
      //
      // If the user is a "brand new" user, then create a new "user" in your own database.
      // Assign this user with the name and email provided.
      // Before this works, you must enable "Firestore" from the firebase console.
      // The Firestore rules must allow the user to write. 
      //------------------------------------------------------------------------------------------
      var user = authResult.user;                     // Get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {
        console.log("Was a new user");
        db.collection("users").doc(user.uid).set({    // Write to firestore. We are using the users' UID for the document name.
          name: user.displayName,                     // Sets the name in the DB to the users display name from auth
          email: user.email
        }).then(function () {
          console.log("New user added to firestore");
          window.location.href = landingPage;         // Redirect to the landing page AFTER the database has been updated.
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });
      } else {
        // User was not new, instantly redirect them.
        return true;
      }
      // Return false to let the database update.
      return false;
    },
    uiShown: function () {
      // The widget is rendered, hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: landingPage,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);