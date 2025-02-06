import { APIService } from "../services/apiService"
import { AdminUIController } from "./AdminUIController";
import { ToastNotifyService } from "../services/ToastNotifyService";
import { UserConfirmationService } from "../services/UserConfirmationService";
export class AdminController{
    constructor() {
        this.api = new APIService();
        this.adminUi = new AdminUIController(this);
        this.toast = new ToastNotifyService();
        this.userConfirmationService = new UserConfirmationService();
    }

    async showAllUsers(){

        try{
            const users = await this.api.getAllUsers();
            this.adminUi.displayAllUsers(users);

        }catch(error){
            this.toast.showToast(error, "error")
        }
    }

    async tryUpdatingUser(user){
        try{
            this.adminUi.displayUpdateUserForm(user);
            const data = await this.adminUi.collectUpdateFormData();
            const response = await this.api.updateUser(data, user.user_id);
            this.toast.showToast(response, "success");
            this.showAllUsers();
        }
        catch(error){
            this.toast.showToast(error, "error");
        }
    }

    async tryAddingUser(user){
        try{
            const res = await this.api.addUser(user);
            this.toast.showToast(res, "success");
            this.showAllUsers();
        }
        catch(error){
            this.toast.showToast(error, "error")
        }
    }

    async tryRemovingUser(user){
        try{
            if(await this.userConfirmationService.getUserConfirmation(`delete user ${user.username}`)){
                const res = await this.api.deleteUser(user.user_id);
                this.toast.showToast(res, "success");
                this.showAllUsers();
                return;
            }
            this.toast.showToast("User cancelled the Operation", "error");
        }
        catch(error){
            this.toast.showToast(error, "error");
        }
    }

    async tryUploadingFile(file){
        try{
            const response = await this.api.bulkUploadMcqs(file);
            this.toast.showToast(response, "success")
        }
        catch(error){
            this.toast.showToast(error, "error");
        }
    }
}