export class IndexUIController{
    constructor() {}

    displayError(tagId, message){
        document.getElementById(`${tagId}-error`).textContent = message;
        setTimeout(()=>{document.getElementById(`${tagId}-error`).textContent = ""}, 3000)
    }
    showSignUpForm() {
        document.getElementById('signup-container').classList.remove("hidden");
        document.getElementById("login-container").classList.add("hidden");
    }
    showSignInForm() {
        document.getElementById('signup-container').classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    }
    
}