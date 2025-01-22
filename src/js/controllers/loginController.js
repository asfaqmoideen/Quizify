import { BASE_URL } from "../constants";
import { IndexUIController } from "./indexUIController";
import { APIService } from "../services/apiService";
import { UserConfirmationService } from "../services/UserConfirmationService";
export class LoginController{
    constructor() {
      this.indexUi = new IndexUIController();
      this.quizApi = new APIService();
      this.userConfirm = new UserConfirmationService();
    }

    async logout(){
      if(await this.userConfirm.getUserConfirmation(`Logout Now ?`)){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        document.location = `/index.html`
      }
    }
    
    async tryLogin(username, password){
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
            console.log(token);
            sessionStorage.setItem("token", token.access_token);
            document.location = "/src/pages/home.html";
          })
          .catch(error => {
            this.indexUi.displayError('login', error.message);
          })
          // const token = await this.quizApi.tryFetchingData("auth/login",
          //   'POST',
          //   JSON.stringify({
          //     username: username,
          //     password: password,
          //   }),
          // )
          // sessionStorage.setItem("token", token.access_token);
          // document.location = "/src/pages/home.html";
    }

    tryRegisteringNewUser({username :name , email, npassword, fpassword}) {
      try{
        if(npassword.value != fpassword.value){
          throw new Error("Passwords Should Match");
        }
          fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username.value,
              email: email.value,
              password: fpassword.value,
            }),
          })
          .then(res => res.json())
          .then(userid => { 
            this.indexUi.displayError("signup", `User created with ${userid}`);
            setTimeout(()=>{this.indexUi.showSignInForm()},3000);
          })
          .catch(error =>{
            this.indexUi.displayError('signup', error.message)
          })
        }
      catch(error){
        this.indexUi.displayError('signup', error.message)
      }
    }
      
}
