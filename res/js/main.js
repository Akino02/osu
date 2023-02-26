const start = document.getElementById("startbutt");
const menu = document.getElementById("menu");
const game = document.getElementById("container_game");
const taker = document.getElementById("taker");
const scorehit = document.getElementById("scorehit");
const music = document.getElementById("music");
const musicvol = document.getElementById("musicvol");
const musicgood = document.getElementById("musicgood");
const hpball = document.getElementById("hp");
const hpbarview = document.getElementById("hpbar");
const resulttab = document.getElementById("result");
const shutres = document.getElementById("shutres");
const score = document.getElementById("score");
const greathit = document.getElementById("greathit");
const misclick = document.getElementById("misclick");

//ZKUSIT TO UDĚLAT NA JAKOUKOLIV HUDBU CO JSI ČLOVĚK ZVOLÍ !!!!!
//Udělat na jiné obtížnosti
//udělat timer hudby    /priorita !!!! (harore)
//udělat aby mohl missnout click     / v podstate je ale moc nejde
//na konci udělat tabulku kolikrát kliknul a kolikrát missnul

let x = 0;
let y = 0;
let z = 7;
let endspam = 0;
let countclick = 0;
let misclicks = 0;
let hpbar = 390;
let scorenum = 0;

//kontrola výšky a šířky zda to sedí zda ne tak tam bude upozornění, že to nefituje
/*window.addEventListener("resize", function() {
  if (window.matchMedia("(min-width: 1400px)").matches && window.matchMedia("(min-width: 100px)").matches) {
    console.log("Screen width is 1400px to 100px")
  } else {
    console.log("Screen doesn't fit with width")
  }
})
window.addEventListener("resize", function() {
  if (window.matchMedia("(min-height: 700px)").matches && window.matchMedia("(min-height: 100px)").matches) {
    console.log("Screen height is 700px to 100px")
  } else {
    console.log("Screen doesn't fit with height")
  }
})*/

//randomnumber pro kruh pozice
function randomnumber() {
  setInterval(() => {
    x = Math.floor(Math.random() * 1400 + 100);
    y = Math.floor(Math.random() * 700 + 100);
  }, 1);
}
//funkce když se dohraje hra tak se vypne hudba a jde to do menu
//funkce pro životy když neklikne na nic tak je konec hry
function musicplay_hpfunction() {
  setInterval(() => {
    if (music.currentTime >= 218 || hpbar <= 20) {
      music.pause();
      menu.style.display = "flex";
      game.style.display = "none";
      resulttab.style.display = "block";
    }
  }, 10);
  if (endspam == 0) {
    setInterval(() => {
      if (hpbar > 20 && game.style.display == "block") {
        hpbar--;
        endspam++;
        hpball.style.left = `${hpbar}px`;
      } else if (hpbar <= 20) {
        music.pause();
      }
    }, 20);
  }
}
function resultwrite() {
    score.innerHTML = `Score: ${scorenum}`;
    greathit.innerHTML = `Hits: ${countclick}`;
    misclick.innerHTML = `Misclicks: ${misclicks - countclick}`;
}
window.onload = () => {
  randomnumber();
  taker.style.top = `${y}px`;
  taker.style.left = `${x}px`;
};

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
  randomnumber();
  hpbar = 390;
  music.currentTime = 0;
  hpball.style.left = `${hpbar}px`;
  hpbarview.style.display = "block";
  music.play();
  musicplay_hpfunction();
  taker.style.top = `${y}px`;
  taker.style.left = `${x}px`;
  menu.style.display = "none";
  game.style.display = "block";
  scorehit.style.display = "none";
  scorenum = 0;
  misclicks = 0;
  countclick = 0;
  resultwrite();
};
game.onclick = () => {
  randomnumber();
  taker.style.top = `${y}px`;
  taker.style.left = `${x}px`;
  misclicks++;
  resultwrite();
};
taker.onclick = () => {
  scorehit.style.display = "block";
  scorehit.style.top = taker.style.top;
  scorehit.style.left = taker.style.left;
  countclick++;
  if (hpbar < 340) {
    hpbar += 60;
  } else if (hpbar >= 340) {
    hpbar = 390;
  } else {
    hpbar += 0;
  }
  randomnumber();
  taker.style.top = `${y}px`;
  taker.style.left = `${x}px`;
  scorenum += (countclick*100);
  resultwrite();
};
shutres.onclick = () => {
  resulttab.style.display = "none";
  hpbar = 390;
  music.currentTime = 0;
  musicplay_hpfunction();
};
