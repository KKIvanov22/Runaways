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
  }];

  assignments.forEach((assignments)=>{
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
  });

document.querySelector(".js-auto-html-homeworks").innerHTML = assignmentsHTML;


let weeklyScheduleHTML ='';

let weeklyScheduleAssignments = [
  {
    id: 1,
    name: "Assignment 1",
    className: "9a",
    teachersName: 'smth',
    description: "Something for description",
    dueDate: "01",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 2,
    name: "Assignment 2",
    className: "9b",
    teachersName: 'smth',
    description: "Something for description",
    dueDate: "02",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 3,
    name: "Assignment 3",
    className: "9c",
    teachersName: 'smth',
    description: "Something for description",
    dueDate: "03",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 4,
    name: "Assignment 3",
    className: "9c",
    teachersName: 'smth',
    description: "Something for description",
    dueDate: "04",
    dueMohth: "january",
    dueYear: "2003"
  },{
    id: 5,
    name: "Assignment 3",
    className: "9c",
    teachersName: 'smth',
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

  document.querySelector(".js-weekly-schedule").innerHTML = weeklyScheduleHTML;

  let classInfoHTML = " ";

  /*let ClassInfo = [
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
    }];*/

  /*ClassInfo.forEach((ClassInfo)=>{
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
  });*/

  document.querySelector(".js-card-container").innerHTML = classInfoHTML;

  document.addEventListener('DOMContentLoaded', () => {
    fetchUserInfoAndTests();
  
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];
    const submitBtn = document.querySelector('.submit-btn');
  
    span.onclick = function() {
      modal.style.display = 'none';
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  
    submitBtn.addEventListener('click', async () => {
      await submitTest();
    });
  });
  
  async function fetchUserInfoAndTests() {
    try {
      const userResponse = await fetch('http://localhost:5501/user-info');
      const userInfo = await userResponse.json();
      document.getElementById('user-name').textContent = userInfo.name;
  
      const testsResponse = await fetch('http://localhost:5501/tests');
      const tests = await testsResponse.json();
      populateAssignments(tests);
    } catch (error) {
      console.error('Error fetching user info and tests:', error);
    }
  }
  
  function populateAssignments(tests) {
    const assignmentsContainer = document.querySelector('.js-auto-html-homeworks');
    tests.forEach(test => {
      const assignmentElement = document.createElement('div');
      assignmentElement.className = 'assignment-item';
      assignmentElement.innerHTML = `
        <h2>${test.testName}</h2>
        <button class="btn-open-test" data-test-id="${test._id}">Open</button>
      `;
      assignmentsContainer.appendChild(assignmentElement);
    });
  
    // Add event listeners to the dynamically added buttons
    const openButtons = document.querySelectorAll('.btn-open-test');
    openButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const testId = button.getAttribute('data-test-id');
        await openTest(testId);
      });
    });
  }
  
  async function openTest(testId) {
    try {
      const testResponse = await fetch(`http://localhost:5501/tests/${testId}`);
      const test = await testResponse.json();
  
      const questionsContainer = document.getElementById('questions-container');
      questionsContainer.innerHTML = ''; // Clear any existing questions
  
      test.questions.forEach((question, index) => {
        const questionElement = document.createElement('form');
        questionElement.className = 'question';
        questionElement.innerHTML = `
          <h3>${index + 1}. ${question.questionText}</h3>
          ${question.answers.map((answer, i) => `
            <label>
              <input type="radio" name="question${index}" value="${i}">
              ${answer}
            </label>
          `).join('')}
        `;
        questionsContainer.appendChild(questionElement);
      });
  
      document.getElementById('myModal').style.display = 'block';
    } catch (error) {
      console.error('Error opening test:', error);
    }
  }
  