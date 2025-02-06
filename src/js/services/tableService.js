import { tableHeadings } from "../constants";

export class TableService {
    constructor(contr) {
      this.adminCon = contr;
    }

    populateUsersTable(users) {
      this.setTableHeadings();
      const usersTable = document.querySelector("#userstable tbody");
      usersTable.textContent = " ";
      const domFrag = document.createDocumentFragment();
      users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.appendChild(this.createRowIndex(index+1));

        for (let key in user) {
          if (this.includesTableHeading(key)) {
            row.appendChild(this.createUserCells(key, user));
          }
        }
        row.appendChild(
          this.createActionCell(row, user, usersTable)
        );
        domFrag.appendChild(row);
      });
  
      usersTable.appendChild(domFrag);
    }

    setTableHeadings() {
      const tableHead = document.querySelector("#userstable thead");
      tableHead.textContent = "";
      const row = document.createElement("tr");
  
      tableHeadings.forEach((heading) => {
        const td = document.createElement("td");
        td.textContent = Object.values(heading);
        row.appendChild(td);
      });
      tableHead.appendChild(row);
    }
  
    createUserCells(key, user) {
      const cell = document.createElement("td");
        cell.textContent = user[key];
        if (key == "role") {
          cell.classList.add("role", `${user[key]}`);
        }
      return cell;
    }
  
    includesTableHeading(key) {
      return tableHeadings.find(
        (a) => Object.keys(a)[0].toLowerCase() === key.toLowerCase()
      );
    }
  
    createActionCell(row, user, usersTable) {
      const actionCell = document.createElement("td");
      const actionDiv = document.createElement("div");
      actionDiv.className = "btn-wrap";
      
      actionDiv.appendChild(this.configureEditButton(user));
      actionDiv.appendChild(this.configureDeleteButton(user, usersTable, row));
  
      actionCell.appendChild(actionDiv);
      return actionCell;
    }
  
    configureEditButton(user){
      const editBtn = document.createElement("button");
      editBtn.innerHTML = `<i class="fa-solid fa-user-pen"></i> Update Role` 
      editBtn.onclick = async () => {
        await this.adminCon.tryUpdatingUser(user);
      };
      return editBtn;
    }
  
    configureDeleteButton(user, usersTable, row){
      const delBtn = document.createElement("button");
      delBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Remove` 
      delBtn.onclick = async () => {
        if (await this.adminCon.tryRemovingUser(user)) {
          usersTable.removeChild(row);
        }
      };
      return delBtn;
    }

    createRowIndex(index){
      const td = document.createElement("td");
      td.textContent = index;
      return td;
  }
  }