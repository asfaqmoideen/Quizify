import { LoginController } from "./controllers/loginController";
import { IndexUIController } from "./controllers/indexUIController";


document.addEventListener('DOMContentLoaded', () => {
    const loginController = new LoginController();
    const indexUIController = new IndexUIController();
    document.getElementById("signinup-btn").addEventListener("click", () => {
        indexUIController.showSignUpForm();
    })
    document.getElementById("signin-btn").addEventListener("click", () => {
        indexUIController.showSignInForm();
    })

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginController.tryLogin(loginForm.username.value, loginForm.password.value);
    });

    const signupform = document.getElementById("signup-form");
    signupform.addEventListener("submit", (event) => {
        event.preventDefault();
        loginController.tryRegisteringNewUser(signupform);
    }) 
});

