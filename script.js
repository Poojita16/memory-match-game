// ================= GAME DATA =================

const emojis = [
    "🍎",
    "🍕",
    "🚀",
    "🐱",
    "🌸",
    "⚽"
];


// ================= GAME VARIABLES =================

let cards = [];

let flippedCards = [];

let matchedPairs = 0;

let moves = 0;

let seconds = 0;

let timerInterval = null;

let gameStarted = false;

let lockBoard = false;


// ================= ELEMENTS =================

const gameBoard =
    document.getElementById("gameBoard");

const timer =
    document.getElementById("timer");

const movesDisplay =
    document.getElementById("moves");

const pairsDisplay =
    document.getElementById("pairs");

const restartBtn =
    document.getElementById("restartBtn");

const winModal =
    document.getElementById("winModal");

const finalTime =
    document.getElementById("finalTime");

const finalMoves =
    document.getElementById("finalMoves");

const playAgainBtn =
    document.getElementById("playAgainBtn");

const themeBtn =
    document.getElementById("themeBtn");


// ================= SHUFFLE =================

function shuffle(array) {

    return array.sort(
        () => Math.random() - 0.5
    );

}


// ================= START GAME =================

function startGame() {

    clearInterval(timerInterval);

    seconds = 0;

    moves = 0;

    matchedPairs = 0;

    flippedCards = [];

    gameStarted = false;

    lockBoard = false;

    timer.textContent = "00:00";

    movesDisplay.textContent = "0";

    pairsDisplay.textContent = "0 / 6";

    winModal.classList.remove("show");


    // Create pairs

    cards = shuffle([
        ...emojis,
        ...emojis
    ]);


    // Clear board

    gameBoard.innerHTML = "";


    // Create cards

    cards.forEach(
        (emoji, index) => {

            const card =
                document.createElement("div");

            card.classList.add("card");

            card.dataset.emoji = emoji;

            card.dataset.index = index;


            card.innerHTML = `

                <div class="card-inner">

                    <div class="card-front">
                        ?
                    </div>

                    <div class="card-back">
                        ${emoji}
                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                flipCard
            );


            gameBoard.appendChild(card);

        }
    );

}


// ================= TIMER =================

function startTimer() {

    timerInterval =
        setInterval(
            () => {

                seconds++;

                const minutes =
                    Math.floor(
                        seconds / 60
                    );

                const remainingSeconds =
                    seconds % 60;


                timer.textContent =

                    `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

            },
            1000
        );

}


// ================= FLIP CARD =================

function flipCard() {

    if (lockBoard) return;

    if (
        this.classList.contains("flipped")
    ) return;

    if (
        this.classList.contains("matched")
    ) return;


    // Start timer on first click

    if (!gameStarted) {

        gameStarted = true;

        startTimer();

    }


    this.classList.add("flipped");

    flippedCards.push(this);


    if (flippedCards.length === 2) {

        moves++;

        movesDisplay.textContent = moves;

        checkMatch();

    }

}


// ================= CHECK MATCH =================

function checkMatch() {

    lockBoard = true;


    const [firstCard, secondCard] =
        flippedCards;


    const isMatch =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;


    if (isMatch) {

        matchedCards(
            firstCard,
            secondCard
        );

    } else {

        unflipCards(
            firstCard,
            secondCard
        );

    }

}


// ================= MATCHED =================

function matchedCards(
    firstCard,
    secondCard
) {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");


    matchedPairs++;

    pairsDisplay.textContent =
        `${matchedPairs} / 6`;


    flippedCards = [];

    lockBoard = false;


    // Check win

    if (matchedPairs === 6) {

        endGame();

    }

}


// ================= NOT MATCHED =================

function unflipCards(
    firstCard,
    secondCard
) {

    setTimeout(
        () => {

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );


            flippedCards = [];

            lockBoard = false;

        },
        900
    );

}


// ================= END GAME =================

function endGame() {

    clearInterval(timerInterval);

    setTimeout(
        () => {

            finalTime.textContent =
                timer.textContent;

            finalMoves.textContent =
                moves;

            winModal.classList.add(
                "show"
            );

        },
        500
    );

}


// ================= RESTART =================

restartBtn.addEventListener(
    "click",
    startGame
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


// ================= DARK MODE =================

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent = "☀️";

        } else {

            themeBtn.textContent = "🌙";

        }

    }
);


// ================= INITIAL GAME =================

startGame();