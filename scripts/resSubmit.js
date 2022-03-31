//=============================================================================
// On page load, prevent default form submission and handle it ourselves.
//=============================================================================
$("document").ready(() => {
    $("#comboForm").submit(e => {
        e.preventDefault();
        submitComboInfo();
    });
});

//=============================================================================
// Submits combo details from the form to the database. Called when the combo
// form is filled with required fields, and submitted.
//=============================================================================
function submitComboInfo() {
    // console.log("in");
    let Restaurant = document.getElementById("restName").value;
    let DiscountCode = document.getElementById("discountCode").value;
    // let Name = document.getElementById("name").value;
    let RegularPrice = parseFloat(document.getElementById("actualPrice").value);
    let DiscountPrice = parseFloat(document.getElementById("discountedPrice").value);
    let Details = document.getElementById("details").value;
    let Address = document.getElementById("restAddress").value;
    let Website = document.getElementById("website").value;
    let Telephone = document.getElementById("telephone").value;
    let Cuisine = document.getElementById("cuisine").value;
    console.log(Restaurant, DiscountCode, RegularPrice, DiscountPrice, Details);

    db.collection("restaurants").add({
        name: Restaurant,
        address: Address,
        website: Website,
        telephone: Telephone
    });

    db.collection("combos").add({
        details: Details,
        cuisine: Cuisine,
        restaurant: Restaurant,
        discountCode: DiscountCode,
        actualPrice: RegularPrice,
        discountedPrice: DiscountPrice,
        discountRatio: RegularPrice / DiscountPrice
    }).then( doc => {
        // Finally, upload the combo image
        uploadComboImage(doc.id);
    });
}

//=============================================================================
// Test function left in to test uploading images to cloud firestore. Image is
// stored as the given image name, under the image folder. Called by test 
// upload button.
//=============================================================================
function clickUpload() {
    // Get the current reference
    let storageRef = firebase.storage().ref("/image/");
    
    let uploadElement = document.getElementById("picUpload");
    let fileBlob = uploadElement.files[0];
    let fileRef = storageRef.child(fileBlob.name);

    console.log(fileRef.name + " will be uploaded.");

    fileRef.put(fileBlob).then(() => {
        console.log("Yay!");
    });
}

//=============================================================================
// Uploads an image from the 'upload file' field to cloud firestore as the 
// passed in comboID. Called by submitComboInfo once a combo document has been
// created.
//=============================================================================
function uploadComboImage(comboID) {
    // Get the current reference to the firebase storage.
    let storageRef = firebase.storage().ref("/image/");

    let uploadElement = document.getElementById("picUpload");   // Gets the upload field
    let fileBlob = uploadElement.files[0];                      // Gets the first file
    let fileRef = storageRef.child(comboID);                    // Store the image under the comboID

    // console.log(fileRef.name + " will be uploaded.");

    fileRef.put(fileBlob).then(() => {
        console.log(fileRef.name + " was uploaded!");
        fileRef.getDownloadURL()
            // Get URL of the uploaded file
            .then(function (url) { 
                // Save the URL into users collection
                db.collection("combos").doc(comboID).update({
                    "image": url
                });
                // console.log(url);
            })
    });
}