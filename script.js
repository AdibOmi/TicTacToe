console.log("Welcome to Tic Tac Toe");
// let audioTurn = new Audio("SoundEffect.mp3"); // this audio is too long, replace it
let gameover = new Audio("GameOver.mp3");
let music = new Audio("music.mp3");
music.loop = true; // Set music to loop
let turn = "X";
let gameEnds = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Checking win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 0, 5, 0, 'center'], // Horizontal top row
        [3, 4, 5, 0, 15, 0, 'center'], // Horizontal middle row
        [6, 7, 8, 0, 25, 0, 'center'], // Horizontal bottom row
        [0, 3, 6, -10.1, 15, 90, 'center'], // Vertical left column
        [1, 4, 7, 0, 15, 90, 'center'], // Vertical middle column
        [2, 5, 8, 10.1, 15, 90, 'center'], // Vertical right column
        [0, 4, 8, 0, 14.5, 45, 'center'], // Diagonal top-left to bottom-right
        [2, 4, 6, 0, 15, 135, 'center'], // Diagonal top-right to bottom-left
    ];

    let won = false;
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!";
            if (boxtext[e[0]].innerText === "X") {
                document.querySelector('.gameContainer').style.background = "cornflowerblue";
            } else {
                document.querySelector('.gameContainer').style.background = "#dd2956";
            }
            gameEnds = true;
            won = true;
            gameover.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            const line = document.querySelector(".line");
            line.style.visibility = 'visible';
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.transformOrigin = e[6]; // Set the transform origin dynamically
            line.style.width = '0'; // Reset width to 0 to start the animation
            setTimeout(() => {
                line.style.width = '100%'; // Animate to full width
                line.style.animation = 'drawLine 0.5s forwards'; // Apply animation
            }, 0); // Timeout to ensure the styles are applied
        }
    });

    if (!won) {
        // Check for draw
        let draw = true;
        Array.from(boxtext).forEach(element => {
            if (element.innerText === "") {
                draw = false;
            }
        });

        if (draw) {
            document.querySelector('.info').innerText = "Draw!";
            document.querySelector('.gameContainer').style.background = "rgb(169, 96, 209)";
            gameEnds = true;
        }
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            if (turn === "X") {
                document.querySelector('.gameContainer').style.background = "cornflowerblue";
            } else {
                document.querySelector('.gameContainer').style.background = "#dd2956";
            }
            // audioTurn.play();
            checkWin();
            if (!gameEnds) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

reset.addEventListener('click', (e) => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameEnds = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    const line = document.querySelector(".line");
    line.style.visibility = 'hidden'; // Hide the line on reset
    line.style.transform = "none"; // Reset the line position instantly
    line.style.width = '0'; // Reset width to 0
    line.style.animation = ''; // Remove any existing animation
    document.querySelector('.gameContainer').style.background = "cornflowerblue";
});

// Checkbox logic for background music
const bgmCheckbox = document.getElementById('bgm');

// Play or pause music based on checkbox state
bgmCheckbox.addEventListener('change', () => {
    if (bgmCheckbox.checked) {
        music.play(); // Play the background music
    } else {
        music.pause(); // Pause the background music
    }
});

// Optional: Ensure music stops when the page is unloaded
window.addEventListener('beforeunload', () => {
    music.pause();
});
