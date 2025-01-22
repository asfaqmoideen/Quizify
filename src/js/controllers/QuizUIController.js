import { UserConfirmationService } from "../services/UserConfirmationService";



export class QuizUIController {
    constructor(quizCOn) {
        this.quizCon = quizCOn;
        this.confirm = new UserConfirmationService();
        this.typesDiv = document.getElementById("quiztypecont");
        this.attemptedAnswers = [];
        this.resultsKeys = ["total_score","total_attempts","percentage"]
    }

    toogleProfileCard(){
        document.getElementById("profilecard").classList.toggle("hidden");
    }

    setProfileCardDetails(){
        const user = JSON.parse(sessionStorage.getItem("user"));
        document.getElementById("username-profilecard").textContent = user.username;
        document.getElementById("userrole-profilecard").textContent = user.role;
    }

    enableAdminAccess(){
        document.getElementById('admin').classList.remove("hidden");
        document.querySelector("head title").textContent=" Quizify - Admin";
    }

    createQuizTypeBlocks(quizTypes) {
        this.typesDiv.textContent = " ";

        quizTypes.forEach(quizType => {
            const qtypeblock = document.createElement("div");
            qtypeblock.classList.add("tile");
            const qtitle = document.createElement("h");
            qtitle.textContent = quizType.toUpperCase();
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
            })
            quizBox.appendChild(optionWrapper);
        }
    
        return quizBox;
    }
    
    displayQuizQuestions(questions) {
        this.hideQuiztypes(true);
        document.getElementById("quizheading").textContent = questions[0].type.toUpperCase();
        const container = document.getElementById("quiz-container");
        this.clearQuizContainer();
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
        hide ?  this.typesDiv.style.display = "none" : this.typesDiv.style.display = "block";
        // if (hide) {
        //     this.typesDiv.style.display = "none";
        // }
        // else {
        //     this.typesDiv.style.display = "block";
        // }
    }

    displayResults(results) {
        this.clearQuizContainer();
        for(let key in results) {
            if(this.resultsKeys.includes(key)) {
                this.setValues(key, results[key]);
            }
        }
        
        document.getElementById("quizresults").classList.remove("hidden");
        document.getElementById("results-showanswers").addEventListener("click", ()=>{
            document.getElementById("quizresults").classList.add("hidden");
           // document.location.reload();
            this.populateAnswers(results.data);

        })

    }

    setValues(tagId, value) {
        document.getElementById(`results-${tagId}`).textContent = value;
    }

    clearQuizContainer(){
        const container = document.getElementById("quiz-container");
        container.textContent = "";
    }

    populateAnswers(data) {
        this.displayAttemptedAnswers(data);
    }

    createQuizBoxForAttemptedAnswers(answer, answerIndex) {

        const quizBox = document.createElement("fieldset");
        quizBox.classList.add("quiz-box");

        const legend = document.createElement("legend");
        legend.textContent = `${answerIndex + 1}. ${answer.question}`;
        quizBox.appendChild(legend);

        for (const [key, value] of Object.entries(answer.options)) {
            const optionWrapper = document.createElement("div");
            optionWrapper.classList.add("option");
    

            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.id = `question_${answerIndex}_option_${key}`;
            radioBtn.value = key;
            // radioBtn.disabled = true;
            if(key == answer.user_answer){
                radioBtn.checked = true;
            }
            
         
            const label = document.createElement("label");
            label.setAttribute("for", `question_${answerIndex}_option_${key}`);
            label.textContent = value;
            if(key == answer.correct_option){
                label.classList.add("correctoption");
            }

            optionWrapper.appendChild(radioBtn);
            optionWrapper.appendChild(label);
            
            quizBox.appendChild(optionWrapper);
        }
    
        return quizBox;
    }
    
    displayAttemptedAnswers(answers) {
        document.getElementById("quizheading").textContent = answers[0].type.toUpperCase() + "  Answers";
        const container = document.getElementById("quiz-container");
        this.clearQuizContainer();
        answers.forEach((answer, index) => {
            const quizBox = this.createQuizBoxForAttemptedAnswers(answer, index, );
            container.appendChild(quizBox);
        });
    }
}
