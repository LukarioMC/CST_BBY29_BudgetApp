// Calls functions once the document is ready and fully loaded.
ready(function() {
    
    // Insert functions relating to the state of the currently logged in user below.
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


function submitComment() {
    console.log("in")
    let Comment = document.getElementById("comment").value;
    console.log(Comment);
    db.collection("comments").add({
        comment: Comment
    })
}

// Dynamically populates cards based on if the user is logged in or not.
function populateUserCards(userDoc) {
    let comboCardTemplate = document.getElementById("comboInfo");
    let comboCardGroup = document.getElementById("comboCardGroup");
    var userBudget = userDoc.data().budget;

    console.log(userBudget);
    if (userBudget > 0) {
        db.collection("combos").where("discountedPrice", "<", userBudget).get();
        console.log("Budget was greater than 0!");
    }
    populateGenericCards(); // Test Call

}

// Populates 3 random combos on landing page as if a user isn't logged in.
function populateGenericCards() {
    let containerElement = document.getElementById("comboCardGroup");
    
    db.collection("combos").limit(3).get() //.orderBy("random")
        .then(allCombos => {
            allCombos.forEach(doc => {
                const data = doc.data();
                let comboID = doc.id;           // Gets the combo ID
                let comboTitle = data.details;  // Gets the combo title
                let price = data.discountedPrice; 
                
                // console.log("Echo!");
                let comboCardTemplate = document.getElementById("cardTemplate").content.cloneNode(true);
                comboCardTemplate.querySelector(".card-header").innerText = comboTitle;
                comboCardTemplate.querySelector(".card").setAttribute("id", comboID);
                comboCardTemplate.querySelectorAll("a")[0].href = "comboInfo.html?id=" + comboID;
                if (data.image != null) {
                    comboCardTemplate.querySelector('img').src = data.image;
                }
                
                containerElement.appendChild(comboCardTemplate);
            });
        });
}

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        // console.log(document.readyState);
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        // console.log("Listener was invoked");
    }
}