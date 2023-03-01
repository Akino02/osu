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
const prog = document.getElementById("prog");
const prog1 = document.getElementById("prog1");
const resulttab = document.getElementById("result");
const shutres = document.getElementById("shutres");
const score = document.getElementById("score");
const greathit = document.getElementById("greathit");
const misclick = document.getElementById("misclick");

//ZKUSIT TO UDĚLAT NA JAKOUKOLIV HUDBU CO JSI ČLOVĚK ZVOLÍ !!!!!
//Udělat na jiné obtížnosti

let x = 0;
let y = 0;
let z = 7;
let endspam = 0;
let countclick = 0;
let misclicks = 0;
let hpbar = 390;
let scorenum = 0;
let progbar = 0;
let progbar1 = 0;
let sx1 = screen.width - screen.width * 0.2;
let sy1 = screen.width - screen.width * 0.7;
let heightres = screen.height;

//randomnumber pro kruh pozice
function randomnumber() {
  setInterval(() => {
    x = Math.floor(Math.random() * sx1 + 10);
    y = Math.floor(Math.random() * sy1 + 10);
  }, 1);
}
function tryrespon() {
  setInterval(() => {
    sx1 = screen.width - 120;
    sy1 = screen.height - 120;
    game.style.height = heightres;
  }, 1);
}
//funkce když se dohraje hra tak se vypne hudba a jde to do menu
//funkce pro životy když neklikne na nic tak je konec hry
function musicplay_hpfunction() {
  setInterval(() => {
    if (music.currentTime >= 218 || hpbar <= 20) {
      music.pause();
      progbar,progbar1 = 0;
      menu.style.display = "flex";
      game.style.display = "none";
      resulttab.style.display = "block";
    }
  }, 10);
  /*if (endspam == 0) {
    setInterval(() => {
      if (hpbar > 20 && game.style.display == "block") {
        hpbar--;
        endspam++;
        hpball.style.left = `${hpbar}px`;
      } else if (hpbar <= 20) {
        music.pause();
        progbar,progbar1 = 0;
      }
    }, 20);
  }*/
}
//funkce která ukazuje délku songu
function musicprogbar() {
  setInterval(() => {
    progbar = music.currentTime;
    prog.style.left = `${(progbar / 2) * 10}px`;
  }, 50);
  setInterval(() => {
    progbar1 = music.currentTime;
    prog1.style.left = `${progbar1}px`;
  }, 50)
}
function resultwrite() {
  score.innerHTML = `Score: ${scorenum}`;
  greathit.innerHTML = `Hits: ${countclick}`;
  misclick.innerHTML = `Misclicks: ${misclicks - countclick}`;
}
window.onload = () => {
  randomnumber();
  tryrespon();
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
  progbar,progbar1,scorenum,misclicks,countclick = 0;
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
  resultwrite();
  musicprogbar();
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
  scorenum += countclick * 100;
  resultwrite();
};
shutres.onclick = () => {
  resulttab.style.display = "none";
  hpbar = 390;
  music.currentTime = 0;
  musicplay_hpfunction();
};
