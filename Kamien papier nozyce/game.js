const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}
const game = {
    playerHand: null,
    aiHand: null,
}
function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;

}
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === 'papier')) {
        return 'win'
    } else {
        return 'loss'
    }

}
function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = null
}
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers
    const info = document.querySelector('[data-summary="who-win"]')
    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins
        info.textContent = 'PLAYER'
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses
        info.textContent = 'AI'
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws
        info.textContent = 'REMIS'
    }
}
const hands = [...document.querySelectorAll('.select img')]
// First Function
function handSelection() {
    game.playerHand = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '')
    this.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.8)'
}
// Second Function
function startGame() {
    if (!game.playerHand) {
        return alert('Wybierz dłoń')
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand)
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}
hands.forEach(hands => hands.addEventListener('click', handSelection))
document.querySelector('.start').addEventListener('click', startGame)