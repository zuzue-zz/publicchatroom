import { Authorize } from "./authorize.js";
import { UiElement } from "./uielement.js";

// UI 

const userinfodiv = document.getElementById('userinfo');
const logoutbtn = document.getElementById('logoutbtn');


// Authorize instance
const authorize = Authorize();


//Ui Element instance
const uiele = UiElement(userinfodiv);

// Get Info and render 
authorize.getUser((data) => {

    console.log(data);

    uiele.userInfoEle(data);
});


// Logout 
logoutbtn.addEventListener('click', (e) => {

    const { logoutUser } = Authorize();
    logoutUser();

});



// 2AU 