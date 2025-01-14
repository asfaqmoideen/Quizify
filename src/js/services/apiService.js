import { BASE_URL } from "../constants";

export class APIService{
    constructor(){

    }

    async tryFetchingData(endpoint, method , bodyData){
        console.log(JSON.stringify(bodyData));
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`,{
                method: method,
                headers : {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: bodyData ? JSON.stringify(bodyData) : null
            });

            return response.json();
        }
        catch(error){
            console.log(error);
        }
    }
    async getQuizTypes(){
        return this.tryFetchingData('mcq/types', "GET");
    }

    async startQuiz(quizType){
        return this.tryFetchingData(`mcqs?type=${quizType}`, "GET");
    }

    async submitQuiz(answers){
        return this.tryFetchingData(`mcqs/submit`, "POST" , { attempted : answers});
    }
}