import { BASE_URL } from "../constants";

export class APIService{

    async tryFetchingData(endpoint, method , bodyData){
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
           throw error;
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

    async getHistory(){
        return this.tryFetchingData('mcqs/history', "GET");
    }

    async getHistorybyId(id){
        return this.tryFetchingData(`mcqs/history/${id}`, "GET");
    }

    async getAllUsers(){
        return this.tryFetchingData(`users`, "GET");
    }

    async addUser(user){
        return this.tryFetchingData(`users`, "POST", user);
    }

    async getUserById(id){
        return this.tryFetchingData(`users/${id}`, "GET");
    }

    async updateUser(user, id){
        return this.tryFetchingData(`users/${id}`, "PATCH", user);
    }

    async deleteUser(id){
        return this.tryFetchingData(`users/${id}`, "DELETE");
    }

    async bulkUploadMcqs(file){
        return this.uploadFetch(`bulk-upload`, "POST", file);
    }

    async createMcq(mcq){
        return this.tryFetchingData(`mcq`, "POST", mcq)
    }

    async uploadCertificateTemplate(file){
        return this.uploadFetch(`upload-template`, "POST", file)
    }

    async uploadFetch(endpoint, method , bodyData){
        console.log(bodyData);
            try {
                const response = await fetch(`${BASE_URL}/${endpoint}`,{
                    method: method,
                    headers : {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: bodyData
                });
    
                return response.json();
            }
            catch(error){
               throw error;
            }
        }
}
