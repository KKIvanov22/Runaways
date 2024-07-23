const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});


// Find buttons & page
let popbutton = document.getElementById('popup');
let awaybutton = document.getElementById('close-popup');
let submitbutton=document.getElementById('submit-popup');
let popwindow = document.getElementById('popupwindow');

// Functions
let toggle = function() {
  popwindow.classList.toggle('pop-up');
  popwindow.classList.toggle('away');
  setTimeout(function(){
    popwindow.classList.toggle('out');
  },250);
}
// Event listeners
popbutton.addEventListener('click', toggle);
awaybutton.addEventListener('click', toggle);
submitbutton.addEventListener('click', toggle);
//AssignmentInformation
let AssignmentInformation={
  id:"",
  name: "",
  class:"",
  dueDate:"",
  description: "",
  questions: [{
    id: "1",
    question: "",
    rightAnswer: "",
    answer: ""
  }]
};
//First question

let QuestionsHTML =`<div id=1 class="question">
<h2 class="question-title">Question 1</h2>
<textarea class="question-input" placeholder="Type your question"></textarea>
<input class="question-right-answer" placeholder="Enter right answer">
</div>`;
document.querySelector(".questions-list").innerHTML = QuestionsHTML;

let questionId = 2;

document.querySelector(".btn-add-question").addEventListener("click", ()=>{
  
  let questionsList = document.querySelector(".questions-list");
  
  // Save the values of the existing questions
  questionsList.querySelectorAll(".question").forEach((question)=>{
    let questionText = question.querySelector(".question-input").value;
    let rightAnswer = question.querySelector(".question-right-answer").value;
    
    AssignmentInformation.questions.forEach(obj => {
      if (obj.id == question.id) {
        obj.question = questionText;
        obj.rightAnswer = rightAnswer;
      }
    });
    
  });
  //Add question
  
  let addQuestionHTML = `<div id="${questionId}" class="question">
  <h2 class="question-title">Question ${questionId}</h2>
  <textarea class="question-input" placeholder="Type your question"></textarea>
  <input class="question-right-answer" placeholder="Enter right answer">
  <div data-id ="${questionId}" class="icon-delete"></div>
  </div>`;
  
  AssignmentInformation.questions.push({id: questionId, question: "", rightAnswer: "", answer: ""});
  
  document.querySelector(".questions-list").innerHTML += addQuestionHTML;
  questionId++;

  renderInputElements(questionsList);

  
  document.querySelectorAll(".icon-delete").forEach((button) =>{
    button.addEventListener("click", ()=>{
      const buttonId = button.dataset.id;
      document.getElementById(buttonId).remove();
      AssignmentInformation.questions.pop({id: buttonId});
    });
  });

  console.log(AssignmentInformation)
});




submitbutton.addEventListener('click', ()=>{
  let _name = document.querySelector(".popup-assignment-input-name");
  let _description = document.querySelector(".popup-assignment-input-description");
  let _class = document.querySelector(".popup-assignment-input-class");
  let _dueDate = document.querySelector(".popup-assignment-input-due-date");
  AssignmentInformation.name = _name.value;
  AssignmentInformation.description = _description.value;
  AssignmentInformation.class = _class.value;
  AssignmentInformation.dueDate = _dueDate.value;
  document.querySelectorAll(".question").forEach((question)=>{
    let questionText = question.querySelector(".question-input").value;
    let rightAnswer = question.querySelector(".question-right-answer").value;
    
    AssignmentInformation.questions.forEach(obj => {
      if (obj.id == question.id) {
        obj.question = questionText;
        obj.rightAnswer = rightAnswer;
      }
    });
    
  }); 
  
  ClearInputData(); 
});
//Clear all input fields in the popup
function ClearInputData() {
  console.log(AssignmentInformation);
  
  document.querySelector(".popup-assignment-input-name").value = '';
  document.querySelector(".popup-assignment-input-description").value = '';
  document.querySelector(".popup-assignment-input-class").value = '';
  document.querySelector(".popup-assignment-input-due-date").value = '';
  
  document.querySelectorAll(".question").forEach((question) => {
    question.querySelector(".question-input").value = '';
    question.querySelector(".question-right-answer").value = '';
    
  });
}

//Render input element's values
function renderInputElements(questionsList) {
  questionsList.querySelectorAll(".question").forEach((element) => {
    
    AssignmentInformation.questions.forEach(obj => {
      if (obj.id == element.id) {
        element.querySelector(".question-input").value = obj.question;
        element.querySelector(".question-right-answer").value = obj.rightAnswer;
      }
    });
    
  });
}