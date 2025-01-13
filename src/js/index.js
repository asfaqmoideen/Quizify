import { LoginController } from "./controllers/loginController";


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signinup-btn").addEventListener("click", () => {
        document.getElementById('signup-container').classList.remove("hidden");
        document.getElementById("login-container").classList.add("hidden");
    })
    document.getElementById("signin-btn").addEventListener("click", () => {
        document.getElementById('signup-container').classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    })

    const loginController = new LoginController();
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loginController.tryLogin(loginForm.username.value, loginForm.password.value);
    })
});

