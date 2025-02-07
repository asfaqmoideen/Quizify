import { UserConfirmationService } from "../services/UserConfirmationService";
import { DOMService } from "../services/DOMService";
import { ToastNotifyService } from "../services/ToastNotifyService";

export class QuizUIController {
    constructor(quizCOn) {
        this.quizCon = quizCOn;
        this.confirm = new UserConfirmationService();
        this.toast = new ToastNotifyService();
        this.domservice = new DOMService();
        this.typesDiv = document.getElementById("quiztypecont");
        this.attemptedAnswers = new Map();
        this.resultsKeys = ["total_score","total_attempts","percentage"]
        this.tableHeadings = ["S. No","Score", "Percentage","Attempted Questions","Attempted At" ,"Action"]
        this.tableHeadKeys = ["attempted_at","percentage","total_attempts","total_score"]
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
        document.querySelectorAll(".headerlist .admin").forEach(ele => {
            ele.classList.remove('hidden')
        })
        document.querySelector("head title").textContent="Admin - Quizify";
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
        setTimeout(() => { document.getElementById(`error-${type}`).textContent =""}, 3000);
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
            radioBtn.name =  `question_${questionIndex}`
            radioBtn.value = key;
    
         
            const label = document.createElement("label");
            label.setAttribute("for", `question_${questionIndex}_option_${key}`);
            label.textContent = value;
            label.name =  `question_${questionIndex}`;
    

            optionWrapper.appendChild(radioBtn);
            optionWrapper.appendChild(label);
    
            radioBtn.addEventListener("change", () => {
               // this.attemptedAnswers.push({mcq_id : questionData.mcq_id, user_answer : key});
                this.attemptedAnswers.set(questionData.mcq_id, key);
            })
            quizBox.appendChild(optionWrapper);
        }
    
        return quizBox;
    }
    
    displayQuizQuestions(questions) {
        const title =  questions[0].type.toUpperCase();
        const container = this.enableQuizContainer(title);
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
                this.attemptedAnswers.clear();
                this.domservice.showModal(false, "answersmodal");
                this.toast.showToast('Quiz Submitted Successfully', 'success');
              //  this.displayError('Quiz Submitted Successfully', "home");
            }
        })
        return submitButton;
    }

    hideQuiztypes(hide) {
        hide ?  this.typesDiv.style.display = "none" : this.typesDiv.style.display = "block";
    }

    displayResults(results) {
        for(let key in results) {
            if(this.resultsKeys.includes(key)) {
                this.setValues(key, results[key]);
            }
        }
        
        document.getElementById("quizresults").classList.remove("hidden");
        document.getElementById("results-showanswers").addEventListener("click", ()=>{
            document.getElementById("quizresults").classList.add("hidden");
            this.populateAnswers(results.data);
        })

    }

    setValues(tagId, value) {
        document.getElementById(`results-${tagId}`).textContent = value;
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
        const tile = answers[0].type.toUpperCase() + "  Answers";
        const container = this.enableQuizContainer(tile);
        container.textContent = "";
        answers.forEach((answer, index) => {
            const quizBox = this.createQuizBoxForAttemptedAnswers(answer, index, );
            container.appendChild(quizBox);
        });
    }

    enableQuizContainer(title){
        document.getElementById("answersheading").textContent = title;
        this.domservice.showModal(true, "answersmodal")
        const quizbox = document.getElementById("quizcontainer");
        quizbox.textContent = "";
        return quizbox;
    }

    displayHistory(histories){
        const table = document.querySelector("#history-table tbody");
        table.textContent = "";

        if(histories.length > 0){
            this.setTableHeadings();
            this.setTableBody(histories, table);
            return;
        }
        table.textContent = "No Histories Found";
    }

    

    setTableHeadings(){
        const table = document.querySelector("#history-table thead");
        table.textContent = ""
        this.tableHeadings.forEach((heading) => {
            const tabled = document.createElement("td");
            tabled.textContent = heading
            table.appendChild(tabled);
        })
    }

    setTableBody(histories, body) {
        histories.forEach((history, index)=>{
            const row = document.createElement("tr");
            row.appendChild(this.createRowIndex(index+1));
            Object.entries(history).forEach(([key,value])=>{
                if(this.tableHeadKeys.includes(key)){
                    row.appendChild(this.createTableData(key,value));
                }
            })
            row.appendChild(this.createActionBtn(history.history_id));
            body.appendChild(row);
        })
    }

    createRowIndex(index){
        const td = document.createElement("td");
        td.textContent = index;
        return td;
    }

    createActionBtn(historyId){
        const td = document.createElement("td");
        td.innerHTML = `<i class="fa-regular fa-eye"></i> Show Answers`;
        td.onclick = ()=>{
            this.quizCon.tryDisplayingHistory(historyId)
        }
        return td;
    }

    createTableData(key,value){
        const td = document.createElement("td");
        if(key == "attempted_at"){
            td.textContent = new Date(value).toLocaleDateString();
            return td;
        }
        else if(key == "percentage"){
            td.textContent = `${value}%`;
            return td;
        }
        td.textContent= value;
        return td;
    }
}