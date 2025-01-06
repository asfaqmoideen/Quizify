document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signinup-btn").addEventListener("click", () => {
        document.getElementById('signup-container').classList.remove("hidden");
        document.getElementById("login-container").classList.add("hidden");
    })
    document.getElementById("signin-btn").addEventListener("click", () => {
        document.getElementById('signup-container').classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    })
});