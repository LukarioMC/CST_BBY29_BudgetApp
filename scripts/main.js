function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    //method #2:  insert using jquery
                    $("#name-goes-here").text(user_Name); //using jquery
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function submitComment() {
    console.log("in")
    let Comment = document.getElementById("comment").value;
    console.log(Comment);
    db.collection("comments").add({
        comment: Comment
    })
}



    function populateCardsDynamically() {
        let comboCardTemplate = document.getElementById("comboInfo");
        let comboCardGroup = document.getElementById("comboCardGroup");

        db.collection("combos").get()
            .then(allComobos => {
                allCombos.forEach(doc => {
                    var hikeName = doc.data().actualPrice; //gets the name field

                    //start work here -sang

                    var hikeID = doc.data().id; //gets the unique ID field
                    var hikeLength = doc.data().length; //gets the length field
                    var hikeName = doc.data().name; //gets the name field
                    var hikeID = doc.data().id; //gets the unique ID field
                    var hikeLength = doc.data().length; //gets the length field
                    var hikeName = doc.data().name; //gets the name field
                    var hikeID = doc.data().id; //gets the unique ID field
                    var hikeLength = doc.data().length; //gets the length field
                    let testHikeCard = hikeCardTemplate.content.cloneNode(true);
                    testHikeCard.querySelector('.card-title').innerHTML = hikeName;
                    testHikeCard.querySelector('.card-length').innerHTML = hikeLength;
                    testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                    testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                    hikeCardGroup.appendChild(testHikeCard);
                })

            })
    }
    populateCardsDynamically();