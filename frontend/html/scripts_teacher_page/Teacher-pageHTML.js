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


//Add question


let QuestionsHTML =`<div  class="question">
                    <h2 class="question-title">Question 1</h2>
                    <textarea class="question-input" placeholder="Type your question"></textarea>
                    <input class="question-right-answer" placeholder="Enter right answer">
                  </div>`;
document.querySelector(".questions-list").innerHTML = QuestionsHTML;

let questionId = 2;
let questionNumber =2;

document.querySelector(".btn-add-question").addEventListener("click", ()=>{
  QuestionsHTML = document.querySelector(".questions-list").innerHTML;
  QuestionsHTML += `<div id="${questionId}" class="question">
                    <h2 class="question-title">Question ${questionId}</h2>
                    <textarea class="question-input" placeholder="Type your question"></textarea>
                    <input class="question-right-answer" placeholder="Enter right answer">
                    <div data-id ="${questionId}" class="icon-delete"></div>
                  </div>`;
  document.querySelector(".questions-list").innerHTML = QuestionsHTML;
  questionId++;

  document.querySelectorAll(".icon-delete").forEach((button) =>{
    button.addEventListener("click", ()=>{
      const buttonId = button.dataset.id;
      document.getElementById(buttonId).remove();
    });
  });
});

// document.querySelectorAll(".icon-delete").forEach((question) =>{
//   button.addEventListener("click", ()=>{
//     if(question.dataset.id > buttonId){
//       questionId--;
//     }    
//   });
// });


