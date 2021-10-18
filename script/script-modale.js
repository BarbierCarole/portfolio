// Get the modal
const modal = document.getElementById("myCompetences");
const modalOff = document.getElementById("modalOff");
const main = document.getElementById("main");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
const closeBtn = document.getElementsByClassName("close-container")[0];
const whiteboard = document.getElementById("whiteboard");
const whiteboardFooter = whiteboard.getElementsByClassName("whiteboard__footer")[0];

const tirette = whiteboardFooter.getElementsByClassName("tirette")[0];
console.log(whiteboardFooter, 'et tirette : ',tirette)
const inputCheckbox = document.getElementById("inputCheckbox");

const delayInMilliseconds = 2300; //1 second
const body = document.main; 


// When the user clicks on the button, open the modal
btn.onclick = function() {
  whiteboard.classList.replace('whiteboard-closed','whiteboard');
  modal.style.display = "block";
  modal.classList.add('show');
}

const claused = () => {
  whiteboard.classList.replace('whiteboard','whiteboard-closed');
  setTimeout(function() {
    modal.style.display = "none";
  }, delayInMilliseconds);
  pauseVideo();
  inputCheckbox.checked = false;
}

tirette.onclick = function () {
  claused();
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  claused();  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    claused();
  }
  if (event.target == modalOff) { 
    claused();
   }
}

