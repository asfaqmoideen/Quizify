import { QuizUIController } from "./QuizUIController";
import { APIService } from "../services/apiService";

export class QuizController {
    constructor() {
        this.quizApi = new APIService();
        this.quizUi = new QuizUIController(this);
    }

    async setQuizTypes() {
        try {
            const quizTypes = await this.quizApi.getQuizTypes();
            this.quizUi.createQuizTypeBlocks(quizTypes);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "home");
        }

    }

    async tryStartingQuiz(quiztype) {
        try {
            const quizQuestions = await this.quizApi.startQuiz(quiztype);
            this.quizUi.displayQuizQuestions(quizQuestions.data);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "home");
        }
    }

    async trySubmittingQuiz(attemptedAnswers) {
        try {
            const submitted = [] ;
            attemptedAnswers.forEach((value, key) => {
                submitted.push({mcq_id: key, user_answer : value});
            })
            const results = await this.quizApi.submitQuiz(submitted);
            this.quizUi.displayResults(results);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "home");
        }
    }

    async trySettingUserHistory(){
        try {
            const history = await this.quizApi.getHistory();
            this.quizUi.displayHistory(history);
        }
        catch(error) {
            this.quizUi.displayError(error.message, "history")
        }
    }

    async tryDisplayingHistory(historyid){
        try {
            const answers = await this.quizApi.getHistorybyId(historyid);
            this.quizUi.populateAnswers(answers.data);
            
        }
        catch(error) {
            this.quizUi.displayError(error.message, "history")
        }
    }
}
