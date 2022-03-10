
function submitComboInfo() {
    console.log("in")
    let Restaurant = document.getElementById("restName").value;
    let Coupon = document.getEleementById("discountCode").value;
    let Name = document.getElementById("name").value;
    let RegularPrice = document.getElementById("actualPrice").value;
    let DiscountPrice = document.getElementById("discountedPrice").value;
    let Item1 = document.getElementById("item1").value;
    let Item2 = document.getElementById("item2").value;
    let Item3 = document.getElementById("item3").value;
    let Item4 = document.getElementById("item4").value;
    let Address = document.getElementById("restAddress").value;
    console.log(Restaurant, Coupon, Name, RegularPrice, DiscountPrice, Item1, Item2, Item3, Item4);