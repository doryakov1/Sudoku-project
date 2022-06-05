'use strict';


// Sudoku Project - Login , Level difficulty , Sudoku game


let gBoard = { board: [], copyBoard: [], cellSelected: null };
let gUser = { userName: 'ohad', userPass: '1234', isLogin: false, gameStats: [{ difficulty: 1, bestTime: 0 }, { difficulty: 2, bestTime: 0 }, { difficulty: 3, bestTime: 0 }] };
let gGameStats = { difficulty: null, nIntervId: null, time: 0, isOn: false };


// On login


function onLogin() {
    let elUser = document.querySelector('.user-name');
    let elPass = document.querySelector('.user-pass');
    let elUserAlert = document.querySelector('.alert-user');
    let elPassAlert = document.querySelector('.alert-pass'); {
        if (elUser.value == gUser.userName && elPass.value == gUser.userPass) {
            renderMenu();
            return true;
        } else {
            elUserAlert.style.display = "none";
            elPassAlert.style.display = "none";
            if (elUser.value != gUser.userName) {
                elUserAlert.style.display = "block";
                return;
            }
            if (elPass.value != gUser.userPass) {
                elPassAlert.style.display = "block";
                return;
            }
        }
    }
}


// On signup


function onSignUp() {
    let elUser = document.querySelector('.user-name');
    let elPass = document.querySelector('.user-pass');
    let elPassConfirm = document.querySelector('.user-pass-confirm');
    let elUserAlert = document.querySelector('.alert-user');
    let elPassAlert = document.querySelector('.alert-pass'); {
        if (elUser.value != ''  &&  elPass.value != '' && elPass.value == elPassConfirm.value) {
            renderMenu();
            return true;
        } else {
            elUserAlert.style.display = "none";
            elPassAlert.style.display = "none";
            if (elUser.value == '') {
                elUserAlert.style.display = "block";
                return;
            }
            if (elPass.value != elPassConfirm.value || elPass.value == '') {
                elPassAlert.style.display = "block";
                return;
            }
        }
    }
}


// When change menu


function onChangeMenu(menu) {
    let elMain = document.querySelector('.main');
    let str = '';
    if (menu == 'signup') {
        str = `<div class="signup">
           <div>
         <h1>Signup</h1>
         <span>Signup and start the game.</span>
          </div>
           <div>
        <input class="user-name" type="text" placeholder="User Name">
        <span class="alert-user">Please fill out the field</span>
        <input class="user-pass" type="password" placeholder="Password">
        <input class="user-pass-confirm" type="password" placeholder="Confirm Password">
        <span class="alert-pass">Passwords don't match</span>
        <button onclick="onSignUp()">Signup</button>
        <button class="menu-change" onclick="onChangeMenu('login')">Login?</button>
          </div>
         </div>`;
    } else if (menu == 'login') {
        str = `<div class="login">
          <div>
          <h1>Login</h1>
          <span>Login with your personal details and start the game.</span>
          </div>
            <div>
             <input class="user-name" type="text" placeholder="User Name">
             <span class="alert-user">User name does not exist</span>
             <input class="user-pass" type="password" placeholder="Password">
             <span class="alert-pass">Incorrect password</span>
             <button onclick="onLogin()">Login</button>
            <button class="menu-change" onclick="onChangeMenu('signup')">Sign up?</button>
           </div>
         </div>`;
    }
    elMain.innerHTML = str;
    return;
}


//  Render level difficult menu


function renderMenu() {
    let elMain = document.querySelector('.main');
    let str = `<div class="level-difficulty">
        <h1>Welcome ${gUser.userName}</h1>
        <span>Level difficulty</span>   
        <div>     
            <button onclick="onLevelDifficulty(1)">1</button>
            <button onclick="onLevelDifficulty(2)">2</button>
            <button onclick="onLevelDifficulty(3)">3</button>
        </div>
        </div>`;
    elMain.innerHTML = str;
    return;
}


// Set level difficulty


function onLevelDifficulty(level) {
    let difficultValue;
    if (1 == level) {
        gGameStats.difficulty = 1;
        difficultValue = 0.25;
    } else if (2 == level) {
        gGameStats.difficulty = 2;
        difficultValue = 0.50;
    } else if (3 == level) {
        gGameStats.difficulty = 3;
        difficultValue = 0.75;
    }

    initGame(difficultValue);
    return;
}


//  Create board and hide cells by random


function createBoard(mat, difficultValue) {
    let hideCells = Math.round(81 * difficultValue);
    while (hideCells > 0) {
        let idx = getRandomIntInclusive(0, 8);
        let jdx = getRandomIntInclusive(0, 8);
        if (mat[idx][jdx] != '') {
            mat[idx][jdx] = '';
            hideCells--;
        }
    }
    return mat;
}


// Create matrix 9x9


function createSudokuMat() {
    let mat = [
        [2, 8, 6, 7, 5, 4, 9, 3, 1],
        [9, 3, 1, 2, 8, 6, 7, 5, 4],
        [7, 5, 4, 9, 1, 3, 8, 6, 2],
        [8, 9, 2, 6, 7, 5, 4, 1, 3],
        [6, 7, 5, 4, 3, 1, 2, 9, 8],
        [4, 1, 3, 8, 9, 2, 6, 7, 5],
        [5, 6, 9, 3, 4, 8, 1, 2, 7],
        [3, 4, 7, 1, 2, 9, 5, 8, 6],
        [1, 2, 8, 5, 6, 7, 3, 4, 9]
    ];


    // Generate random numbers in the matrix 


    let randomRounds = Math.floor((Math.random() * 10) + 1);
    for (let idx1 = 0; idx1 < randomRounds; idx1++) {
        for (let idx = 0; idx < 9; idx++) {
            for (let jdx = 0; jdx < 9; jdx++) {
                mat[idx][jdx] = mat[idx][jdx] + 1;
                if (mat[idx][jdx] == 10) {
                    mat[idx][jdx] = 1;
                }
            }
        }
    }


    // Copy the matrix 


    gBoard.copyBoard = mat.map(num => num.slice());

    return mat;
}


// Create and start the game


function initGame(difficultValue) {
    gBoard.board = createBoard(createSudokuMat(), difficultValue);
    renderBoard(gBoard.board);
    renderBoardButtons();
    renderScoreBoard();
    setTime();
    renderAnime();
}


// Render the anime


function renderAnime() {
    let elBoardGame = document.querySelector('.board-game');
    let elBoarButtons = document.querySelector('.board-btn');
    let styleOpacity = 0;
    for (let idx = 0; idx < 1000; idx++) {
        setTimeout(() => {
            elBoardGame.style.opacity = styleOpacity += 0.1;
            elBoarButtons.style.opacity = styleOpacity += 0.1;
        }, 500);
    }

    return;
}


// Render the board 


function renderBoard(board) {
    let str = '';
    let elMain;
    let elBoardGame;
    if (!document.querySelector('.board-game')) {
        str = `<table class="board-game" onkeydown=" returncheckEventKey(event.key)" cellpadding="0" border="0" cellspacing="0">`;
        elMain = document.querySelector('.main');
    } else {
        elBoardGame = document.querySelector('.board-game');
    }
    for (let idx = 0; idx < board.length; idx++) {
        let elTdClass = '';
        if (idx == 2 || idx == 5) {
            elTdClass = `class="border-button"`;
        }
        str += `<tr>`
        for (let jdx = 0; jdx < board[idx].length; jdx++) {
            let elClassCell = '';

            if (gBoard.cellSelected) {
                let idx1 = gBoard.cellSelected[0];
                let jdx1 = gBoard.cellSelected[1];
                if (idx == idx1 && jdx == jdx1) {
                    elClassCell = 'cell-selected';
                }
            }
            if (typeof (board[idx][jdx]) != 'number') {
                str += `<td ${elTdClass}><div onclick="onCellClick(${idx} , ${jdx})" class="cell board-input ${elClassCell}"> ${board[idx][jdx]}`;
            } else {
                str += `<td ${elTdClass}><div  class="cell">  ${board[idx][jdx]}`;
            }
            str += `</td></div>`;
        }
        str += `</tr>`;
    }
    if (elMain) {
        str += `</table>`;
        elMain.innerHTML = str;
    } else {
        elBoardGame.innerHTML = str;
    }
    return;
}


// Render the board buttons


function renderBoardButtons() {
    let str = '';
    let elMain = document.querySelector('.main');
    str = `   
          <div class="board-btn">
          <div class="game-btn"> 
          <button onclick="onFinish()">Finish</button>
          <button onclick="onAgain()">Again</button>
          </div>
          <div> 
          <button onclick="onButtonClick(1)">1</button>
          <button onclick="onButtonClick(2)">2</button>
          <button onclick="onButtonClick(3)">3</button>
          </div>
          <div> 
            <button onclick="onButtonClick(4)">4</button>
            <button onclick="onButtonClick(5)">5</button>
            <button onclick="onButtonClick(6)">6</button>
            </div>
            <div> 
            <button onclick="onButtonClick(7)">7</button>
            <button onclick="onButtonClick(8)">8</button>
            <button onclick="onButtonClick(9)">9</button>
            </div>
        </div>`;

    elMain.innerHTML += str;
    return;
}


// On cell click


function onCellClick(idx, jdx) {
    let board = gBoard.board;
    gBoard.cellSelected = [idx, jdx];
    renderBoard(board);
    return;
}


// On button click


function onButtonClick(value) {
    if (!gBoard.cellSelected) return;
    setValue(value);
    return;
}


// Set value


function setValue(value) {
    let board = gBoard.board;
    let idx = gBoard.cellSelected[0];
    let jdx = gBoard.cellSelected[1];
    board[idx][jdx] = value.toString();
    renderBoard(board);
    return;
}


// Handle key


function handleKey(event) {
    if (!gBoard.cellSelected) return;
    if (!(event.key >= 1 && event.key <= 9)) return;
    let value = event.key;
    setValue(value);
    return;
}


//When again button is clicked 


function onAgain() {
    let elMain = document.querySelector('.main');
    clearInterval(gGameStats.nIntervId);
    gGameStats.nIntervId = null;
    gGameStats.time = 0;
    elMain.innerHTML = '';
    onLevelDifficulty(gGameStats.difficulty);
    return;
}


//When finish button is clicked


function onFinish() {

    if (IfItsWin() == true) {
        let idxStats = gUser.gameStats.findIndex(gameStats => gameStats.difficulty == gGameStats.difficulty);
        if (gUser.gameStats[idxStats].bestTime > gGameStats.time || gUser.gameStats[idxStats].bestTime == 0) {
            gUser.gameStats[idxStats].difficulty = gGameStats.difficulty;
            gUser.gameStats[idxStats].bestTime = gGameStats.time;
        }
        renderModal(true);
    } else {
        renderModal(false);
    }
    clearInterval(gGameStats.nIntervId);
    gGameStats.nIntervId = null;
    gGameStats.time = 0;
    return;
}


// Check if win or lose  


function IfItsWin() {
    let board = gBoard.board;
    let copyBoard = gBoard.copyBoard;
    for (let idx = 0; idx < board.length; idx++) {
        for (let jdx = 0; jdx < board[idx].length; jdx++) {
            if (board[idx][jdx] != copyBoard[idx][jdx]) {
                return false;
            }
        }
    }
    return true;
}


// Render modal by win or lose  


function renderModal(itsWin) {
    let elMain = document.querySelector('.main');
    let str = 'You Won! Try Other Level';
    let strClass = "modal-won-btn"
    let strImg = `src="assets/img/won-img.png" alt="won"`;
    if (itsWin == false) {
        str = 'Try Again!';
        strClass = "modal-lose-btn";
        strImg = `src="assets/img/lose-img.png" alt="lose"`;
    }
    let str1 = ` 
    <div class="modal-content" id="modal-popup">
    <h1>Difficulty: ${gGameStats.difficulty}</h1>
      <img ${strImg} />
      <button onclick="renderMenu()" class=${strClass}>
      ${str}
      </button>
    </div>
    `;
    elMain.innerHTML = str1;
    return;
}


// Render the score of the board  


function renderScoreBoard() {
    let elUserScore = document.querySelector('.user-score');
    let str = '';
    gUser.gameStats.forEach(val => {
        str += `<div><span>Difficulty:  ${val.difficulty} 
         ,   Best Time:  ${val.bestTime}</span></div>`
    });
    elUserScore.innerHTML = str;
    return;
}


// Start and render the timer  


function setTime() {
    let elUserBoard = document.querySelector('.user-board');
    gGameStats.nIntervId = setInterval(() => {
        gGameStats.time++;
        let str = `<span>${gGameStats.time}</span>`;
        elUserBoard.innerHTML = str;
    }, 1000);
    return;
}