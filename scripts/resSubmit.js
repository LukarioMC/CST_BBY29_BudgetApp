function submitComboInfo() {
    console.log("in");
    let Restaurant = document.getElementById("restName").value;
    let DiscountCode = document.getElementById("discountCode").value;
    let Name = document.getElementById("name").value;
    let RegularPrice = document.getElementById("actualPrice").value;
    let DiscountPrice = document.getElementById("discountedPrice").value;
    let Details = document.getElementById("details").value;
    let Address = document.getElementById("restAddress").value;
    let Website = document.getElementById("website").value;
    let Telephone = document.getElementById("telephone").value;
    let Cuisine = document.getElementById("cuisine").value;
    console.log(Restaurant, DiscountCode, Name, RegularPrice, DiscountPrice, Details);

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
    });
}

function clickUpload() {
    let storageRef = firebase.storage().ref("/image/");

    let uploadElement = document.getElementById("picUpload");
    let fileBlob = uploadElement.files[0];
    let fileRef = storageRef.child("test.png");   // "/image/" + fileBlob.name

    console.log(fileRef.name + " will be uploaded.");
    // let uploadTask = storageRef.put(fileName);
    console.log(fileRef);
    console.log(fileBlob);

    // var reader = new FileReader();
    // let byteRaw = reader.readAsArrayBuffer(fileBlob)
    // let bytes = new Uint8Array(byteRaw)
    // fileRef.put(bytes).then(snapshot => {
    //                 console.log("Uploaded!");
    //             });

    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('image/' + fileRef.name).put(fileBlob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    console.log("unauthorized");
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    console.log("unkown error", error.serverResponse);
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );


    // var reader = new FileReader();
    //     // POST the result after reader parsing finishes
    //     reader.onloadend = function () {
    //         imageBase64 = reader.result;
    //         // console.log(imageBase64);

    //         fileRef.putString(imageBase64, 'data_url').then(snapshot => {
    //             console.log("Uploaded!");
    //         });
    //     };

    // reader.readAsDataURL(fileBlob);

    // var storage = firebase.storage().ref("/image");

    // //upload file
    // var upload = storage.put(fileName);
}