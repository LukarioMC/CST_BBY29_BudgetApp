db.collection("combos").get()
  .then(allCombos => {
    firebase.auth().onAuthStateChanged(function (user) {
      // Get the users favourites
      if (user && window.location.search == "?id=" + user.uid) {
        // User is signed in and properly directed.
        
        // TODO Get users favourite combos
        allCombos.forEach(doc => {
          createCard(doc);
        });
      } else {
        // No user is signed in. Get all combo documents.
        allCombos.forEach(doc => {
          createCard(doc);
        });
      }
    });
  });

function createCard(doc) {
  let currentCombo = doc.data();
  // TODO Replace "moneyplate" with ${doc.id} so we can retrieve each image as the combo ID
  let card =
    `<div class="card m-lg-5 align-items-center">
      <div class="square-img" style="background-image: url('images/moneyplate.jpg');"></div>
      <div class="d-flex flex-column p-3 w-50">
        <h3 class="combo-name">${currentCombo.details}</h2>
        <p>${currentCombo.restaurant}</p>
      </div>
    </div>`;
  document.getElementById("comboGallery").innerHTML += card;
}