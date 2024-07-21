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