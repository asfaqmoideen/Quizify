import { AccessValidationService } from "./services/AccessValidationService.js";
import { QuizController } from "./controllers/QuizController.js";

document.addEventListener('DOMContentLoaded', async () => {
    const quizCon = new QuizController();
    const accessvalidate = new AccessValidationService();

    await accessvalidate.validateCurrentUser(sessionStorage.getItem("token"));
    quizCon.setQuizTypes();
})


