import { BASE_URL } from "../constants";
export class LoginController{
    constructor() {

    }

    tryLogin(username, password){
        fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          })
          .then(res => res.json())
          .then(token => {
            sessionStorage.setItem("token", token.access_token);
            document.location = "/src/pages/home.html";
          })
    }

    tryRegisteringNewUser(form){
        
    }
}