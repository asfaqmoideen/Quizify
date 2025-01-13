export class UserConfirmationService{
     constructor(){
      this.confirmTitle = document.getElementById("confirm-title");
      this.yesbtn = document.getElementById("yesbtn");
      this.notbtn = document.getElementById("nobtn");
      this.confirm = document.getElementById("confirmation")
     }
    getUserConfirmation(context) {
        this.showConfirmationBlock(true);
        this.confirmTitle.textContent = `Are you sure to ${context}?`;
    
        return new Promise((resolve) => {
          this.yesbtn.onclick = () => {
            this.showConfirmationBlock(false);
            resolve(true);
          };
          this.notbtn.onclick = () => {
            this.showConfirmationBlock(false);
            resolve(false);
          };
        });
      }
    
      showConfirmationBlock(value) {
        value ? this.confirm.classList.remove("hidden") : this.confirm.classList.add("hidden");
      }
}