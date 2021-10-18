/* pour faire ronronner le chat */
const audio = new Audio("../sound/cat.mp3");

const bgSoundCat = document.getElementById('bgSoundCat');
const ronron = document.getElementById('ronron');


bgSoundCat.addEventListener('mouseover', function(e) {
    
    ronron.style.display = "block";
    audio.currentTime = 0;    
    audio.play(); 
    audio.loop = true;
 
})

bgSoundCat.addEventListener('mouseout', function(e) {
    
    ronron.style.display = "none";
    audio.loop = false;
    audio.currentTime = 5;
    audio.play(); 
  
})

cat.style.cursor="pointer";