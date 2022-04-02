//=============================================================================
// Calls these functions once the document is ready and fully loaded.
// Insert functions relating to the state of the currently logged in user below.
//=============================================================================
ready(function() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            let userDocRef = db.collection("users").doc(user.uid);
            
            // Get the document for the currently logged in users from firestore.
            userDocRef.get().then(userDoc => {
                $("#name-goes-here").text(userDoc.data().name); // Insert name
                populateUserCards(userDoc);
            });
        } else {
            // No user is signed in
            
            // hideWelcome();
            populateGenericCards();
        }
    });
});

//=============================================================================
// Dynamically populates cards based on if the user is logged in or not. Called
// when document is ready and user is logged in.
//=============================================================================
function populateUserCards(userDoc) {
    let comboCardTemplate = document.getElementById("comboInfo");
    let comboCardGroup = document.getElementById("comboCardGroup");
    var userBudget = userDoc.data().budget;

    console.log(userBudget);
    if (userBudget > 0) {
        // Gets Documents where the price is less than the users budget.
        db.collection("combos").where("discountedPrice", "<", userBudget).get()
            .then(combos => {
                let max = combos.size;
                // generateRandomCardsFromCollection(num, collection)
                let index1 = Math.floor(Math.random() * max);
                let index2 = Math.floor(Math.random() * max);
                let index3 = Math.floor(Math.random() * max);
                // console.log(combos, index1, index2, index3, max);
                addCard(combos.docs[index1]);
                addCard(combos.docs[index2]);
                addCard(combos.docs[index3]);
            });
        console.log("Budget exists and was greater than 0!");
    } else {
        populateGenericCards(); // Populate random generic cards. 
    }

}

//=============================================================================
// Populates 3 random combos on landing page as if a user isn't logged in.
// Called when the document is ready and a user isn't logged in.
//=============================================================================
function populateGenericCards() {
    db.collection("combos").limit(3).get() //.orderBy("random")
        .then(allCombos => {
            allCombos.forEach(doc => {
                addCard(doc);
            });
        });
}

//=============================================================================
// Creates a combo card on the page from the provided document.
//=============================================================================
function addCard(doc) {
    docData = doc.data();
    console.log(docData);
    let containerElement = document.getElementById("comboCardGroup");
    
    let comboID = doc.id;
    let comboTitle = docData.details;  // Gets the combo title
    let price = docData.discountedPrice.toFixed(2);

    let comboCardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);
    comboCardTemplate.querySelector(".card-header").innerText = comboTitle;
    comboCardTemplate.querySelector(".card .placeholder").innerText = price;
    comboCardTemplate.querySelector(".card").setAttribute("id", comboID);
    comboCardTemplate.querySelectorAll("a")[0].href = "comboInfo.html?id=" + comboID;
    if (docData.image != null) {
        comboCardTemplate.querySelector('img').src = docData.image;
    }
                
    containerElement.appendChild(comboCardTemplate);
}


//=============================================================================
// Generic document ready callback function. Calls the passed in callback once
// the document is completely loaded.
//=============================================================================
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        // console.log(document.readyState);
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        // console.log("Listener was invoked");
    }
}