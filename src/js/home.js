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
        quizUi.domservice.showModal(false, "answersmodal")
    })

    const adminCon = new AdminController();
    document.getElementById('admin').addEventListener("click", () => {
        adminCon.showAllUsers();
    })

    document.getElementById('user-cancel').addEventListener('click', ()=>{
        quizUi.domservice.showModal(false, "userformcont");
    })

    document.getElementById('adduser').addEventListener('click', ()=>{
        quizUi.domservice.showModal(true, "userformcont");
    })

    const form = document.getElementById('userform');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const enteredData = Object.fromEntries(formData.entries());
        adminCon.tryAddingUser(enteredData);
        adminCon.showAllUsers();
        quizUi.domservice.showModal(false, 'userformcont')

    })

    document.getElementById('quizbulkupload').addEventListener('click', ()=>{
        quizUi.domservice.showModal(true, "uploadfilemodal");
    })


    document.getElementById('quizsubmit').addEventListener("click", () => {
        const fileInput = document.getElementById("quizbulk");
        const file = fileInput.files[0]; 
        adminCon.tryUploadingFile(file);
    });
    

    document.getElementById("update-user-cancel").addEventListener("click",()=>{
        quizUi.domservice.showModal(false, "update-user-role");
    });

    document.getElementById("upload-cancel").addEventListener("click",()=>{
        quizUi.domservice.showModal(false, "uploadfilemodal");
    });
})


