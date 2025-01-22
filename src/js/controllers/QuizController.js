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
            const results = await this.quizApi.submitQuiz(attemptedAnswers);
            this.quizUi.displayResults(results);
        }
        catch (error) {
            this.quizUi.displayError(error.message, "home");
        }
    }
}
