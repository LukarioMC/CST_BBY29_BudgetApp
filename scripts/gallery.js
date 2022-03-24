db.collection("combos").get()
  .then(allCombos => {
    allCombos.forEach(doc => {
      let currentCombo = doc.data();
      let card = 
        `<div class="card m-lg-5 align-items-center">
          <div class="square-img" style="background-image: url('images/moneyplate.jpg');"></div>
          <div class="d-flex flex-column p-3 w-50">
            <h3 class="combo-name">${currentCombo.details}</h2>
            <p>${currentCombo.restaurant}</p>
          </div>
        </div>`;
          // 
      document.getElementById("comboGallery").innerHTML += card;
    });
  });