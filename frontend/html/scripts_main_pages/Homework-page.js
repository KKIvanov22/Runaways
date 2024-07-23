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
/*let assignments = [
  {
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 2,
    name: "Assignment 2",
    className: "9b",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 3,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 4,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 5,
    name: "Assignment 3",
    className: "9c",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003",
    finished: false
  },{
    id: 1,
    name: "Assignment 1",
    className: "9a",
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2004",
    finished: false
  }];*/

 /* assignments.forEach((assignments)=>{
    if(assignments.name === "" || assignments.finished){
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
  });*/

document.querySelector(".js-auto-html-homeworks").innerHTML = assignmentsHTML;

  let classInfoHTML = " ";

  let ClassInfo = [
    {
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 2,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 3,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    },{
      classId: 1,
      className: "9a",
      teachersName: 'smth'
    }];

  ClassInfo.forEach((ClassInfo)=>{
    if(ClassInfo.name === ""){
      return;
    }
    else{
      classInfoHTML += `
      <div class="card">
        <div class="card-user-info">
          <img src="images_main_pages/user icon.png" />
          <h2>${ClassInfo.teachersName}</h2>
        </div>
        <p>Class name: ${ClassInfo.className}</p>
      </div>
      `
      }
  });

  document.querySelector(".js-card-container").innerHTML = classInfoHTML;

  document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfoAndTests();
  });
  
  async function fetchUserInfoAndTests() {
    try {
      const userResponse = await fetch('http://localhost:5501/user-info');
      const user = await userResponse.json();
      const userClass = user.class;
  
      const testsResponse = await fetch('http://localhost:5501/tests');
      const tests = await testsResponse.json();
  
      const containers = document.querySelectorAll('.js-auto-html-homeworks');
      containers.forEach(container => {
        container.innerHTML = ''; // Clear any existing content
  
        tests.forEach(test => {
          if (test.testClass === userClass) {
            const testElement = document.createElement('div');
            testElement.classList.add('activity-container', 'assignment', 'image-container');
            testElement.innerHTML = `
              <div class="overlay">
                <div class="homework-information">
                  <h3 class="homework-name">Homework: ${test.testName}</h3>
                  <h3 class="homework-description">Description: </h3>
                  <h3 class="class-name">Class: ${test.testClass}</h3>
                  <button class="btn-homework">Open</button>
                  <h3 class="homework-due-date">Due: </h3>
                </div>
              </div>
            `;
            container.appendChild(testElement);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching user info or tests:', error);
    }
  }