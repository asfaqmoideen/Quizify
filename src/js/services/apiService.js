import { BASE_URL } from "../constants";

export class APIService{
    constructor(){

    }

    async getQuizTypes(){
        try{
            const response = await fetch(`${BASE_URL}/mcq/types`);
            return response.json();
        }
        catch(error){
            console.error(error);
        }
    }

}