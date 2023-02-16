const start = document.getElementById("startbutt");
const game = document.getElementById("container_game");
const taker = document.getElementById("taker");
const scorehit = document.getElementById("scorehit");
const music = document.getElementById("music");
const musicvol = document.getElementById("musicvol");
const musicgood = document.getElementById("musicgood");
const hpball = document.getElementById("hp");
const hpbarview = document.getElementById("hpbar");

//const test = document.getElementsByClassName("test");


//ZKUSIT TO UDĚLAT NA JAKOUKOLIV HUDBU CO JSI ČLOVĚK ZVOLÍ !!!!!


let x = 0;
let y = 0;
let z = 7;
let endspam = 0;
let countclick = 0;
let hpbar = 390;

//randomnumber pro kruh pozice
function randomnumber() {
  setInterval(() => {
    x = Math.floor(Math.random() * 1400 + 100);
    y = Math.floor(Math.random() * 700 + 100);
  }, 1000);
}
//když se dohraje hra tak se vypne hudba a jde to do menu
function musicplay() {
  setInterval(() => {
    if (music.currentTime >= 218 || hpbar == 0) {
      music.pause();
      start.style.display = "block";
      musicvol.style.display = "block";
      musicgood.style.display = "block";
      game.style.display = "none";
      hpbarview.style.display = "none";
    }
  }, 1);
}

//animace score
function scoreanime() {
  scorehit.style.transition = "0.1s";
}
//funkce pro životy když neklikne na nic tak je konec hry
function hpfunction() { //spamuje se tam tahle funkce a je to rychlejší když hraje znovu
  if (endspam == 0){
    setInterval(() => {
      if (hpbar > 0) {
        hpbar--;
        endspam++;
        hpball.style.left = `${hpbar}px`;
      }
      else if(hpbar == 0){
        music.pause();
      }
    }, 10);
  }
}
musicgood.onclick = () => {
  z = musicvol.value;
  if (z == 10) {
    music.volume = z - 9;
    alert("Music Volume was changed");
  } else if (musicvol.value == "") {
    alert("Nothing was changed");
  } else {
    music.volume = `0.${z}`;
    alert("Music Volume was changed");
  }
  musicvol.value = "";
};
start.onclick = () => {
  hpbar = 390;
  hpball.style.left = `${hpbar}px`;
  hpbarview.style.display = "block";
  hpfunction();
  music.play();
  musicplay();
  x = Math.floor(Math.random() * 1400 + 100);
  y = Math.floor(Math.random() * 700 + 100);
  start.style.display = "none";
  game.style.display = "block";
  musicvol.style.display = "none";
  musicgood.style.display = "none";
  music.currentTime = 0;
};
taker.onclick = () => {
  scoreanime();
  scorehit.style.display = "block";
  scorehit.style.top = taker.style.top;
  scorehit.style.left = taker.style.left;
  countclick++;
  randomnumber();
  taker.style.top = `${y}px`;
  taker.style.left = `${x}px`;
  hpbar += 60;
};
