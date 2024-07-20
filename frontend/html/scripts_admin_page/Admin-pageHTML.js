const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

function showDropdown() {
  document.getElementById("dropdown-content").style.display = "block";
};

function hideDropdown() {
  document.getElementById("dropdown-content").style.display = "none";
};

function selectOption(value) {
  document.getElementById("roles").value = value;
  hideDropdown();
};

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById("dropdown-content");
  if (!dropdown.contains(event.target) && !document.getElementById("roles").contains(event.target)) {
      hideDropdown();
  }
});