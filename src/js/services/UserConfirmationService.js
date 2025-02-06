import { DOMService } from "./DOMService";

export class UserConfirmationService{
     constructor(){
      this.confirmTitle = document.getElementById("confirm-title");
      this.yesbtn = document.getElementById("yesbtn");
      this.notbtn = document.getElementById("nobtn");
      this.domservice = new DOMService();
     }

    getUserConfirmation(context) {
        this.domservice.showModal(true, "confirmation");
        this.confirmTitle.textContent = `Are you sure to ${context}?`;
    
        return new Promise((resolve) => {
          this.yesbtn.onclick = () => {
            this.domservice.showModal(false, "confirmation");
            resolve(true);
          };
          this.notbtn.onclick = () => {
            this.domservice.showModal(false, "confirmation");
            resolve(false);
          };
        });
      }

}