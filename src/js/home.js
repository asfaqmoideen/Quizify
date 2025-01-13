import {APIService} from "./services/apiService.js";
import { MockAPI } from "./services/mockAPI.js";
import { UserConfirmationService } from "./services/UserConfirmationService.js";

document.addEventListener('DOMContentLoaded', () => {
    const quizCon = new QuizController();

    quizCon.setQuizTypes();
})


class QuizController{
    constructor(){
        this.quizApi = new MockAPI();
        this.quizUi = new QuizUIController(this);
    }

    async setQuizTypes(){
        try {
            const quizTypes = await this.quizApi.getQuizTypes();
            this.quizUi.createQuizTypeBlocks(quizTypes);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "quiztype");
        }

    }

    async tryStartingQuiz(quiztype){
        try {
           const quizQuestions = await this.quizApi.startQuiz(quiztype);
           console.log(quizQuestions);
            this.quizUi.startQuizQuestions(quizQuestions);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "quiztype");
        }
    }
}

class QuizUIController{
    constructor(quizCOn){
        this.quizCon = quizCOn;
        this.confirm = new UserConfirmationService();
    }

    createQuizTypeBlocks(quizTypes){
        console.log(quizTypes);
        const typesDiv = document.getElementById("quiztypecont");
        typesDiv.textContent = " ";

        quizTypes.forEach(quizType => {
            const qtypeblock = document.createElement("div");
            qtypeblock.classList.add("tile");
            const qtitle = document.createElement("p");
            qtitle.textContent = quizType;
            qtypeblock.appendChild(qtitle);
            qtypeblock.onclick = async() => { 
                if(await this.confirm.getUserConfirmation(`Start ${quizType} Quiz Now ?`)){
                    this.quizCon.tryStartingQuiz(quizType);
                }
            };
            typesDiv.appendChild(qtypeblock);
        })

    }
    displayError(message, type){
        document.getElementById(`error-${type}`).textContent = message;
    }
}