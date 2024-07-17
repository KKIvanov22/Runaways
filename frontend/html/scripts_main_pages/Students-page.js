const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

let assignmentsHTML = '';
//Backend: A list of assingments is required with the following data for the last tree assingments that have been assingned to the student.
let assignments = [
  {
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "1/1/2001"
  },{
    id: 2,
    name: "Assignment 2",
    className: "9b",
    description: "Something for description",
    dueDate: "2/2/2002"
  },{
    id: 3,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "3/3/2003"
  }];

  assignments.forEach((assignments)=>{
    if(assignments.name === ""){
      return;
    }
    else{
      assignmentsHTML += `
      <container class="activity-container image-container"> 
       <div class="overlay">
        <div class="homework-information">
         <h3 class="homework-name">Homework: ${assignments.name}</h3>
         <h3 class="homework-date">Due: ${assignments.dueDate}</h3>
         <h3 class="class-name">Class: ${assignments.className}</h3>
         <button class="btn-homework">Open</button>
         <h3 class="homework-description">Description: ${assignments.description}</h3>
        </div>
       </div>
      </container>
      `
      }
  });

document.querySelector(".js-auto-html-homeworks").innerHTML = assignmentsHTML;
