export class DOMService{
    constructor(){

    }

    showModal(show, id){
        const modal = document.getElementById(id);
        const bg = document.getElementById("bg-modal");
        if(show){
            bg.classList.remove("hidden");
            modal.classList.remove("hidden");
        }
        else{
            modal.classList.add("hidden");
            bg.classList.add("hidden");
        }
    }
}