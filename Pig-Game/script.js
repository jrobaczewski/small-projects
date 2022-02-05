'use strict';

const player0 = document.querySelector('.player--0')
const score0 = document.querySelector('#score--0')
const current0 = document.querySelector('#current--0')
const player1 = document.querySelector('.player--1')
const score1 = document.querySelector('#score--1')
const current1 = document.querySelector('#current--1')
const dice = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNewGame = document.querySelector('.btn--new')


// Starting conditions 
score0.textContent = 0
score1.textContent = 0
dice.classList.add('hidden')
let scores = [0, 0]
let currentScore = 0
let activePlayer = 0
let playing = true

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0
    player0.classList.toggle('player--active')
    player1.classList.toggle('player--active')
}
const rollDice = () => {
    if (playing) {
        const randomNumber = Math.trunc(Math.random() * 6) + 1
        dice.classList.remove('hidden')
        dice.src = `dice-${randomNumber}.png`
        if (randomNumber !== 1) {
            // Add dice to currentScore
            currentScore += randomNumber
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        } else {
            // Switch player
            switchPlayer()
        }
    }
}
const holdCurrent = () => {
    if (playing) {
        scores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
        if (scores[activePlayer] >= 100) {
            playing = false
            dice.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            btnRoll.classList.remove('btn-show')
            btnHold.classList.remove('btn-show')
            btnNewGame.classList.add('btn-show')
        } else {
            switchPlayer()
        }
    }
}
const newGame = () => {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    current0.textContent = 0
    current1.textContent = 0
    btnRoll.classList.add('btn-show')
    btnHold.classList.add('btn-show')
    btnNewGame.classList.remove('btn-show')
    playing = true
    score0.textContent = 0
    score1.textContent = 0
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')

}
btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', holdCurrent)
btnNewGame.addEventListener('click', newGame)