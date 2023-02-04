const root = document.getElementById("root");
const number = document.getElementById("number");
const theScore = document.getElementById("score");
const PB = document.getElementById("PB")

const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");

changeNum();
changebutton();

//score function
function score() {
  scoreNow = theScore.innerHTML;
  scoreNow = scoreNow.replace("Score: ", "");
  scoreNow++;
  theScore.innerHTML = "Score: " + scoreNow;
}

//rundom number
function randomNum() {
  let min = 1;
  let max = 5;

  scoreNow = theScore.innerHTML;
  scoreNow = scoreNow.replace("Score: ", "");
  if (scoreNow > 5) {
    max = (scoreNow / 3) * max;
    min = max / 2 - 3;
    speed = scoreNow * 2;
  }

  // edit the animation speed keyframes
  // by faisal alsaweed
  // i hide my name so if some idiot copy my code
  // he will not know who is the real author
  // number.style.animation = `block ${speed}s infinite linear`;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

//change the number
function changeNum() {
  num = randomNum();
  sqrnum = num * num;
  number.innerHTML = sqrnum;
}

function changebutton() {
  buttons = [button1, button2, button3];
  buttons.forEach((button) => {
    button.innerHTML = randomNum();
  });
  //choose a random button
  let randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  //change the innerHTML of the random button to the number
  randomButton.innerHTML = num;
}

// check if the right number is pressed
function checkNum(buttonpressed) {
  if (buttonpressed.innerHTML == num) {
    score();
    changeNum();
    changebutton();

    // reset the number position keyframes
    number.style.animation = "none";
    number.offsetHeight;
    number.style.animation = null;
  } else {
      gameover();
  }
}
function gameover() {
    over.style.display = "block";
    floor.style.animation = "none";
    number.style.animation = "none";
    button1.style.pointerEvents = "none";
    button2.style.pointerEvents = "none";
    button3.style.pointerEvents = "none";
    highest();
}
function startgame() {
    over.style.display = "none";
    start.style.display = "none";
    floor.style.animation = "infinitefloors 10s infinite linear";
    number.style.animation = "block 10s infinite linear";
    button1.style.pointerEvents = "auto";
    button2.style.pointerEvents = "auto";
    button3.style.pointerEvents = "auto";
}
function highest() {
    PB.style.display = "block";
    scoreNow = theScore.innerHTML;
    PB.innerHTML = "highest " + scoreNow;
    theScore.innerHTML = "Score: " + "0";

}
let isAlive = setInterval(function () {
  // get current X position
  let numberpos = parseInt(
      window.getComputedStyle(number).getPropertyValue("left")
  );

  // detect collision
  if (numberpos < 30 && numberpos > 0) {
    // collision
      gameover();
    }
}, 10);

document.body.onkeyup = function (e) {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        startgame()
    }
}
