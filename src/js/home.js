import { AccessValidationService } from "./services/AccessValidationService.js";
import { QuizController } from "./controllers/QuizController.js";
import { QuizUIController } from "./controllers/QuizUIController.js";
import { LoginController } from "./controllers/loginController.js";
import { AdminController } from "./controllers/AdminController.js";

document.addEventListener('DOMContentLoaded', async () => {

    const quizCon = new QuizController();
    const accessvalidate = new AccessValidationService();
    const quizUi = new QuizUIController();
    const loginCon = new LoginController();
    document.getElementById("profilebtn").addEventListener("click",() => {quizUi.toogleProfileCard()});
    document.getElementById("logout-btn-profilecard").addEventListener("click", ()=>{loginCon.logout();}); 

    try{
        const user = await accessvalidate.validateCurrentUser(sessionStorage.getItem("token"));
        if(user.role === "admin"){
            quizUi.enableAdminAccess();
        }
        quizUi.setProfileCardDetails();
        quizCon.setQuizTypes();
    }
    catch(e){
        quizUi.displayError(e.message, "home");
    }

    document.querySelector("header h1").addEventListener("click", ()=>{
        document.location.reload();
    }) 

    document.getElementById('history').addEventListener("click",()=>{
        quizCon.trySettingUserHistory();
    })

    document.getElementById('answersclose').addEventListener("click", ()=>{
        document.getElementById('answersmodal').classList.add("hidden");
    })

    const adminCon = new AdminController();
    document.getElementById('admin').addEventListener("click", () => {
        adminCon.trySettingAdminOptions();
    })
})


