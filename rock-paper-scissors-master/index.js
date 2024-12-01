// selectors
const closeBtn = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const rulesBtn = document.querySelector(".rules");

const gameBtn = document.querySelectorAll(".btn-game");
const score = document.querySelector(".score");
const condition = document.querySelector(".result-condition");

const playerWin = document.querySelector(".player-pick");
const computerWin = document.querySelector(".computer-pick");
const resultEnd = document.querySelector(".result");
const playAgain = document.querySelector(".result-btn");

const container1 = document.querySelector(".game-container1");
const container2 = document.querySelector(".game-container2");

let playerChoice;
let computerChoice;
let playerScore = 12;
let result;

// --- event handlers --- //
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  modal.classList.remove("active");
  backdrop.classList.remove("active");
});

rulesBtn.addEventListener("click", () => {
  modal.classList.add("active");
  backdrop.classList.add("active");
});

gameBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const choice = e.target.closest("button");
    pick(choice);
    main();
  });
});

playAgain.addEventListener("click", () => {
  playerWin.classList.remove("winner");
  computerWin.classList.remove("winner");
  container1.classList.add("game-active");
  container2.classList.remove("game-active");
  resultEnd.classList.remove("game-active");
  document.querySelector(".player-choice").remove();
  document.querySelector(".computer-choice").remove();
  document
    .querySelector(".wrapper-btn")
    .classList.remove("paper", "scissors", "rock");

  document
    .querySelector(".wrapper-btn-2")
    .classList.remove("paper", "scissors", "rock");
  document.querySelector(".wrapper-btn-2").style.display = "none";
});

// ==== functionality === //

const main = function () {
  afterChoice();
  playerChose(playerChoice);
  computerPick(randomPick);
  //setTimeout(computerChose(computerChoice), 1000);
  setTimeout(computerChose, 1000, computerChoice);
  setTimeout(winCondition(playerChoice, computerChoice), 1000);
  setTimeout(displayResult, 1000);
};

const pick = function (pick) {
  if (pick.classList.contains("paper")) {
    playerChoice = "paper";
  }
  if (pick.classList.contains("scissors")) {
    playerChoice = "scissors";
  }
  if (pick.classList.contains("rock")) {
    playerChoice = "rock";
  }
};

const afterChoice = function () {
  container1.classList.remove("game-active");
  container2.classList.add("game-active");
};

const playerChose = function (player) {
  //const playerPick = document.querySelector(".player-pick");
  const playerPick = document.querySelector(".wrapper-btn");
  playerPick.classList.add(`${playerChoice}`);
  const img = document.createElement("img");
  playerPick.appendChild(img);
  img.classList.add("player-choice");
  img.src = `./images/icon-${player}.svg`;
};

const computerChose = function (computer) {
  //const computerPick = document.querySelector(".computer-pick");
  const computerPick = document.querySelector(".wrapper-btn-2");
  computerPick.style.display = "block";
  computerPick.classList.add(`${computer}`);
  const img = document.createElement("img");
  computerPick.appendChild(img);
  img.classList.add("computer-choice");
  img.src = `./images/icon-${computer}.svg`;
};

const randomPick = function () {
  const random = Math.floor(Math.random() * 3 + 1);

  return random;
};

const computerPick = function (number) {
  let random = number();

  if (random === 1) {
    return (computerChoice = "paper");
  }
  if (random === 2) {
    return (computerChoice = "scissors");
  }
  if (random === 3) {
    return (computerChoice = "rock");
  }
};

const winCondition = (player1, player2) => {
  if (player1 === "paper" && player2 === "rock") {
    result = 1;
    playerScore += 1;
  }
  if (player1 === "paper" && player2 === "paper") {
    result = 0;
    return playerScore;
  }
  if (player1 === "paper" && player2 === "scissors") {
    result = 2;
    playerScore -= 1;
  }

  if (player1 === "rock" && player2 === "scissors") {
    result = 1;
    playerScore += 1;
  }
  if (player1 === "rock" && player2 === "rock") {
    result = 0;
    return playerScore;
  }
  if (player1 === "rock" && player2 === "paper") {
    result = 2;
    playerScore -= 1;
  }

  if (player1 === "scissors" && player2 === "paper") {
    result = 1;
    playerScore += 1;
  }
  if (player1 === "scissors" && player2 === "scissors") {
    result = 0;
    return playerScore;
  }
  if (player1 === "scissors" && player2 === "rock") {
    result = 2;
    playerScore -= 1;
  }
  setTimeout(displayScore, 1000);
};

const displayScore = () => {
  if (playerScore < 0) {
    playerScore = 0;
  }
  score.innerHTML = playerScore;
};

const displayResult = () => {
  if (result === 1) {
    condition.textContent = "YOU WIN";
    playerWin.classList.add("winner");
  }
  if (result === 0) {
    condition.textContent = "It's a DRAW";
  }

  if (result === 2) {
    condition.textContent = "YOU LOSE";
    computerWin.classList.add("winner");
  }
  resultEnd.classList.add("game-active");
};
