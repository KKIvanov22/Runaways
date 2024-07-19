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
//Backend: A list of assingments is required with the following data. The assignments have to be sorted by garde. Ant then by the date they were made, starting with the most recent one.
let assignments = [
  {
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 2,
    name: "Assignment 2",
    className: "9b",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 3,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 4,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 5,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  }];

  assignments.forEach((assignments)=>{
    if(assignments.name === ""){
      return;
    }
    else{
      assignmentsHTML += `
      <container class="activity-container assignment image-container"> 
        <div class="overlay">
          <div class="homework-information">
            <h3 class="homework-name">Homework: ${assignments.name}</h3>
            <h3 class="homework-description">Description: ${assignments.description}</h3>
            <h3 class="class-name">Class: ${assignments.className}</h3>
            <button class="btn-homework">Open</button>
            <h3 class="homework-due-date">Due: ${assignments.dueDate} ${assignments.dueMohth} ${assignments.dueYear}</h3>
                </div>
                </div>
               </container>
      `
      }
  });

document.querySelector(".js-auto-html-homeworks").innerHTML = assignmentsHTML;


let weeklyScheduleHTML ='';

let weeklyScheduleAssignments = [
  {
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "01",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 2,
    name: "Assignment 2",
    className: "9b",
    description: "Something for description",
    dueDate: "02",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 3,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 4,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "04",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 5,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "05",
    dueMohth: "january",
    dueYear: "2003"
  }];

weeklyScheduleAssignments.forEach((weeklyassignments)=>{
    if(weeklyScheduleAssignments.name === ""){
      return;
    }
    else{
      weeklyScheduleHTML += `
      <div class="day-and-activity activity-assignments">
         <div class="day">
           <h1>${weeklyassignments.dueDate}</h1>
            <p>${weeklyassignments.dueMohth}</p>
         </div>
         <div class="activity">
           <h2>Due: ${weeklyassignments.name}</h2>
         </div>
         <button class="btn">Open</button>
      </div>
      `
      }
  });

  let classInfoHTML = " ";

  assignments.forEach((assignments)=>{
    if(assignments.name === ""){
      return;
    }
    else{
      classInfoHTML += `
      <div class="card">
                <div class="card-user-info">
                  <img src="images_main_pages/user icon.png" />
                  <h2>Teachers.name</h2>
                </div>
                <p>${assignments.className}Information about class</p>
              </div>
      `
      }
  });

  


  document.querySelector(".js-card-container").innerHTML = classInfoHTML;

