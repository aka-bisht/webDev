"use strict";

// Selecting Elements

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

// Starting Condition

let scores, activePlayer, playing, currentScore;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

init();

// Switch Player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Generating Dice Roll

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);

    // Display Dice Roll
    dice.src = `img/dice-${diceNumber}.png`;
    dice.classList.remove("hidden");

    // Dice Number !== 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;

      // Adding Dice Number To Current
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

// Holding Score

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Winner
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// Resetting Game

btnNew.addEventListener("click", init);
