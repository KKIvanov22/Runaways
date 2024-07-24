const navItems = document.querySelectorAll(".nav-item");
let testIdGlobal = "";
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
      const userResponse = await fetch('http://localhost:5501/user-info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'           
    });
      const user = await userResponse.json();
      const userClass = user[0].class;
      const userName = user[0].name;
  
      const testsResponse = await fetch('http://localhost:5501/tests');
      const tests = await testsResponse.json();
      const containers = document.querySelectorAll('.js-auto-html-homeworks');
      containers.forEach(container => {
        container.innerHTML = ''; 
  
        tests.forEach(test => {
          
          if (test.testClass === userClass) {
            const testElement = document.createElement('div');
            testElement.classList.add('activity-container', 'assignment', 'image-container');
            testElement.innerHTML = `
              <div class="overlay">
                <div class="homework-information">
                  <h3 class="homework-name">Homework: ${test.testName} - test</h3>
                  <h3 class="homework-description">Description: </h3>
                  <h3 class="class-name">Class: ${test.testClass}</h3>
                  <button class="btn-homework" data-test-id="${test._id}" data-user-name="${userName}">Open</button>
                  <h3 class="homework-due-date">Due: </h3>
                </div>
              </div>
            `;
            container.appendChild(testElement);
          }
        });
  
        const buttons = container.querySelectorAll('.btn-homework');
        buttons.forEach(button => {
          button.addEventListener('click', async (event) => {
            const testId = event.target.getAttribute('data-test-id');
            await openTestPopup(testId);
          });
        });
      });
    } catch (error) {
      console.error('Error fetching user info or tests:', error);
    }
  }
  
  async function openTestPopup(testId) {
    try {
      const response = await fetch(`http://localhost:5501/tests/${testId}`);
      const test = await response.json();
      const questionsContainer = document.getElementById('questions-container');
      testIdGlobal = test._id;
      questionsContainer.innerHTML = ''; // Clear any existing content
  
      test.questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
          <h3>${index + 1}. ${question.question}</h3>
          <form>
            ${question.answers.map(answer => `
              <div>
                <input type="radio" id="${answer}" name="question${index}" value="${answer}">
                <label for="${answer}">${answer}</label>
              </div>
            `).join('')}
          </form>
        `;
        questionsContainer.appendChild(questionElement);
      });
  
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
    } catch (error) {
      console.error('Error fetching test questions:', error);
    }
  }
  
  async function submitTest() {
    try {
      const questionsContainer = document.getElementById('questions-container');
      const forms = questionsContainer.querySelectorAll('form');
      const answers = [];
  
      forms.forEach((form, index) => {
        const selectedAnswer = form.querySelector('input[type="radio"]:checked');
        if (selectedAnswer) {
          answers.push({
            questionIndex: index,
            answerIndex: Array.from(form.querySelectorAll('input[type="radio"]')).indexOf(selectedAnswer)
          });
        }
      });
  
      const testId = testIdGlobal;
      const userName = document.querySelector('.btn-homework[data-user-name]').getAttribute('data-user-name');
      const testResponse = await fetch(`http://localhost:5501/tests/${testId}`);
      const test = await testResponse.json();
      
      let score = 0;
      console.log(testId);
      answers.forEach(answer => {
        const question = test.questions[answer.questionIndex];
        const correctAnswerIndex = question.answers.indexOf(question.correctAnswer);
       
        if (correctAnswerIndex+1 === answer.answerIndex) {
          score++;
        }
      });
  
      const submission = {
        student: userName,
        test: test.testName,
        score: `${score}/${test.questions.length}`
      };
  
      const response = await fetch('http://localhost:5501/submit-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
      });
  
      if (response.ok) {
        alert('Test submitted successfully');
        document.getElementById('myModal').style.display = 'none';
      } else {
        alert('Error submitting test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Error submitting test');
    }
    testIdGlobal = "";
  }
  