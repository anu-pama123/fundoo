var toggle  = document.getElementById("toggle");
var content = document.getElementById("content");

toggle.addEventListener("click", function() {
  content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
});