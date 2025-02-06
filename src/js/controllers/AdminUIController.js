import { ToastNotifyService } from "../services/ToastNotifyService";
import { DOMService } from "../services/DOMService";
import { TableService } from "../services/tableService";
export class AdminUIController{
    constructor(adminCon){
        this.adminCon = adminCon;
        this.toast = new ToastNotifyService();
        this.tableService = new TableService(adminCon);
        this.dom = new DOMService();
    }

    displayAllUsers(users){
        console.log(users);
        this.tableService.populateUsersTable(users);
    }

    displayUpdateUserForm(user){
        this.dom.showModal(true, "update-user-role");
        document.getElementById("usernamespan").textContent = user.username
        document.getElementById('roleupdate').value = user.role;
    }

    populateUserForm({username, email, password, role}) {
        document.getElementById("name").value = username;
        document.getElementById("email").value = email;
        document.getElementById("password").value = password;
        document.getElementById("role").value = role;
    }

    collectUpdateFormData(){
        return new Promise((resolve)=>{
            const roleform = document.getElementById("update-user-role-form");
                roleform.addEventListener("submit", async (e)=>{
                    e.preventDefault();
                    const formData = new FormData(roleform);
                    const enteredData = Object.fromEntries(formData.entries());
                    this.dom.showModal(false, "update-user-role")
                    resolve(enteredData);
                });
        })
    }
}