//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadNavigation(){
    console.log($('#navbarPlaceholder').load('./text/nav.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadNavigation();  //invoke the function
