const levels = [
    {
        cards: [
            { value: '🐶' },
            { value: '😸' },
            { value: '🐵' },
            { value: '🐰' },
            { value: '🐼' },
            { value: '🐸' },
        ]
    },
    {
        cards: [
            { value: '🦁' },
            { value: '🐺' },
            { value: '🦒' },
            { value: '🐿️' },
            { value: '🦌' },
            { value: '🐦' },
        ]
    },
    {
        cards: [
            { value: '🐘' },
            { value: '🦏' },
            { value: '🐋' },
            { value: '🦈' },
            { value: '🐳' },
            { value: '🐊' },
        ]
    },
    {
        cards: [
            { value: '🍕' },
            { value: '🍔' },
            { value: '🍣' },
            { value: '🍩' },
            { value: '🍰' },
            { value: '🍝' },
        ]
    },
    {
        cards: [
            { value: '🚗' },
            { value: '🚲' },
            { value: '🛫' },
            { value: '🚢' },
            { value: '🚂' },
            { value: '🚌' },
        ]
    }
];

let currentLevel = 0;
let pairsFound = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let hintUsed = false;
let timerValue = 0;
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards(level) {
    let cardValues = level.cards.map(card => ({ ...card }));
    cardValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);

    const gameContainer = document.getElementById('game');
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.lastChild);
    }

    cardValues.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const frontFace = document.createElement('div');
        frontFace.classList.add('face', 'front');
        frontFace.textContent = '';

        const backFace = document.createElement('div');
        backFace.classList.add('face', 'back');
        backFace.textContent = card.value;

        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.toggle ('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent) {
        disableCards();
        pairsFound++;
        if (pairsFound === levels[currentLevel].cards.length) {
            clearInterval(timerInterval);
            alert("Поздравляем! Вы завершили уровень за " + timerValue + " секунд!");
            nextLevelButton.style.display = 'block';
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        pairsFound = 0;
        hintUsed = false;
        resetTimer();
        createCards(levels[currentLevel]);
        nextLevelButton.style.display = 'none';
    } else {
        alert("Поздравляем! Вы прошли все уровни!");
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerValue++;
        document.getElementById("timer").innerText = timerValue + " сек.";
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerValue = 0;
    document.getElementById("timer").innerText = timerValue + " сек.";
    startTimer();
}

function startGame() {
    currentLevel = 0;
    pairsFound = 0;
    hintUsed = false;
    resetTimer();
    createCards(levels[currentLevel]);
    document.getElementById('start-game-button').style.display = 'none';
}

const startGameButton = document.getElementById('start-game-button');
startGameButton.onclick = startGame;

const nextLevelButton = document.getElementById('next-level-button');
nextLevelButton.onclick = nextLevel;