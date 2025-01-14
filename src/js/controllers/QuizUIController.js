import { UserConfirmationService } from "../services/UserConfirmationService";



export class QuizUIController {
    constructor(quizCOn) {
        this.quizCon = quizCOn;
        this.confirm = new UserConfirmationService();
        this.typesDiv = document.getElementById("quiztypecont");
        this.attemptedAnswers = [];
    }

    createQuizTypeBlocks(quizTypes) {
        console.log(quizTypes);
        this.typesDiv.textContent = " ";

        quizTypes.forEach(quizType => {
            const qtypeblock = document.createElement("div");
            qtypeblock.classList.add("tile");
            const qtitle = document.createElement("p");
            qtitle.textContent = quizType;
            qtypeblock.appendChild(qtitle);
            qtypeblock.onclick = async () => {
                if (await this.confirm.getUserConfirmation(`Start ${quizType} Quiz Now ?`)) {
                    this.quizCon.tryStartingQuiz(quizType);
                }
            };
            this.typesDiv.appendChild(qtypeblock);
        });

    }
    displayError(message, type) {
        document.getElementById(`error-${type}`).textContent = message;
    }


    createQuizBox(questionData, questionIndex) {

        const quizBox = document.createElement("fieldset");
        quizBox.classList.add("quiz-box");

        const legend = document.createElement("legend");
        legend.textContent = `${questionIndex + 1}. ${questionData.question}`;
        quizBox.appendChild(legend);

        for (const [key, value] of Object.entries(questionData.options)) {
            const optionWrapper = document.createElement("div");
            optionWrapper.classList.add("option");
    

            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.id = `question_${questionIndex}_option_${key}`;
            radioBtn.value = key;
    
         
            const label = document.createElement("label");
            label.setAttribute("for", `question_${questionIndex}_option_${key}`);
            label.textContent = value;
    

            optionWrapper.appendChild(radioBtn);
            optionWrapper.appendChild(label);
    
            radioBtn.addEventListener("change", () => {
                this.attemptedAnswers.push({mcq_id : questionData.mcq_id, user_answer : key});
                console.log(this.attemptedAnswers);
            })
            quizBox.appendChild(optionWrapper);
        }
    
        return quizBox;
    }
    
    displayQuizQuestions(questions) {
        this.hideQuiztypes(true);
        const container = document.getElementById("quiz-container");
        container.textContent = "";
        questions.forEach((question, index) => {
            const quizBox = this.createQuizBox(question, index);
            container.appendChild(quizBox);
        });
        container.appendChild(this.createSubmitButton());
    }
    
    createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.className = "btn btn-primary";
        submitButton.textContent = "Submit Quiz";
        submitButton.addEventListener('click', ()=>{
            if(this.quizCon.trySubmittingQuiz(this.attemptedAnswers)){
                this.displayError('Quiz Submitted Successfully', "home");
                this.attemptedAnswers = [];
            }
        })
        return submitButton;
    }
    hideQuiztypes(hide) {
        if (hide) {
            this.typesDiv.style.display = "none";
        }
        else {
            this.typesDiv.style.display = "block";
        }
    }
}
