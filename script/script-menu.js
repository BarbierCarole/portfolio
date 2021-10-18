/* Sélection des éléments HTML */
let menuButton = document.getElementById('menuButton');
let ul = document.querySelector('ul');

/* gestionnaire d'événement sur le a#link pour venir changer l'attribution de la classe .open à la ul et au span#burger */
menuButton.addEventListener('click', function(e) {
  e.preventDefault();
  ul.classList.toggle('open');
  
})

// ajoute active dans le bouton de menu actif
// Add active class to the current button (highlight it)
var header = document.getElementById("buttonMenuActive");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}