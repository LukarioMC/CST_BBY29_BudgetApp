//=============================================================================
// Gets the combo documents from the database, then calls the appropriate 
// function to create the correct cards. (Incomplete, favourites not implemented)
//=============================================================================
db.collection("combos").orderBy("discountedPrice").get()
  .then(allCombos => {
    firebase.auth().onAuthStateChanged(function (user) {
      let urlParams = new URLSearchParams(window.location.search);
      if (user && urlParams.get("id") == user.uid) {
        // User is signed in and was properly directed.
        
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

//=============================================================================
// Creates a new card, populated with the passed in documents data from the 
// database. Contains placeholder image, which is replaced by the appropriate 
// image from cloud storage.
//=============================================================================
function createCard(doc) {
  let currentCombo = doc.data();
  let imgUrl = "./images/moneyplate.jpg";
  if (currentCombo.image != null) {
    imgUrl = currentCombo.image;
  }
  
  let card =
    `<a href="comboInfo.html?id=${doc.id}" class="card m-lg-5 align-items-center bg-accent">
      <div class="square-img" style="background-image: url('${imgUrl}');"></div>
      <div class="col d-flex flex-column p-3">
        <h3 class="combo-name">${currentCombo.details}</h2>
        <p>${currentCombo.restaurant}</p>
      </div>
      <div class="col text-end px-4">
        <h3 class="combo-price text-success">$${currentCombo.discountedPrice.toFixed(2)}</h2>
      </div>
    </a>`;
  document.getElementById("comboGallery").innerHTML += card;
}