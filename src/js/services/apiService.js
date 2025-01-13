import { BASE_URL } from "../constants";

export class APIService{
    constructor(){

    }

    tryPostingData(contexta)
    {
        try{
            const response = fetch(BASE_URL)
            if(!response.ok){
                throw new Error(`Unable to ${context}`);
            }
        }
        catch(e){
            console.log(e.message);
        }
    }
}