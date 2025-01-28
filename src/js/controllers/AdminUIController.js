export class AdminUIController{
    constructor(adminCon){
        this.adminCon = adminCon;
        this.tableHeadings = ["S. No.", "UserName", "Role", "Action"];
    }

    setAdminOptions(options){
        const div = document.getElementById("adminoptions");
        div.textContent = "";
        options.forEach(option => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = option;
            div.addEventListener("click", ()=>{
                this.adminCon.executeUserOption(option);
            });
            div.appendChild(tile);
        });
    }

    displayAllUsers(users){
        const div = document.getElementById("adminoptions");
        div.textContent = "";
        this.setTableHeadings(Object.keys(users));
        users.forEach(user => {
            row.appendChild(this.createRowIndex(index+1));
        })
    }
    setTableHeadings(headings){
        const head = document.querySelector("#userstable thead");
        head.textContent = "";
        headings.forEach(title => {
            if(title == "username" || title == "role"){
                const title = document.createElement('td');
                title.textContent = title;
                head.append(title);
            }
        })
    }

    
    createRowIndex(index){
        const td = document.createElement("td");
        td.textContent = index;
        return td;
    }
}