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