import { APIService } from "../services/apiService"
import { AdminUIController } from "./AdminUIController";
export class AdminController{
    constructor() {
        this.api = new APIService();
        this.adminUi = new AdminUIController();
        this.optionActions = {
            "Get All Users": this.getAllUsers,
            "Get User Id": this.getUserById,
            "Add User": this.addUser,
            "Update User": this.updateUser,
            "Remove User": this.removeUser,
            "Create a Mcq": this.createMcq,
            "Bulk Upload MCQ": this.bulkUploadMcq,
            "Upload Certificate Template": this.uploadCertificateTemplate
        };
    }

    trySettingAdminOptions(){
        this.adminUi.setAdminOptions(Object.keys(this.optionActions));
    }

    executeUserOption(option){

        try {
            const action = this.optionActions[option];
            action.call(this)
        }
        catch (e){
            console.log(e)
        }
    }
    getAllUsers(){
        const users = this.api.getAllUsers();
        this.adminUi.displayAllUsers(users);
    }
}