document.addEventListener("DOMContentLoaded", () => {
      const sidebarItems = document.querySelectorAll(".headerlist li");
      const contentSections = document.querySelectorAll(".content");
    
        sidebarItems.forEach((item) => {
            item.addEventListener("click", () => {
              if(item.id != "profilebtn"){
                switchContent(item.id);
              }
            });
          });
  
      function switchContent(id) {
        contentSections.forEach((section) => {
          section.classList.remove("active");
          if (section.id === `${id}-content`) {~
            section.classList.add("active");
          }
        });
    
        sidebarItems.forEach((item) => {
          item.classList.remove("active");
        });
    
        document.getElementById(id).classList.add("active");
      }
    });
    