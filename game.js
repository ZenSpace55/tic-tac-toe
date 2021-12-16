let adviceText = document.querySelector(".adviceText");

const Game = (() => {

    let turn = "X";
    let gameOver;

    const endTurn = function(){

        console.log("attempting turn switch");
        let gameState = Gameboard.checkForWin();
        if (gameState === "X"){
            this.gameOver = true;
            adviceText.textContent = "WINNER! Congratulations X";
        }
        else if (gameState === "O"){
            this.gameOver = true;
            adviceText.textContent = "WINNER! Congratulations O";
        }
        else if (gameState === "D"){
            this.gameOver = true;
            adviceText.textContent = "-DRAW-";
        }
        if (!this.gameOver){
            if (this.turn === "X"){
                this.turn = "O";
                adviceText.textContent = "O's Turn!"
            }
            else{
                this.turn = "X";
                adviceText.textContent = "X's Turn!"
            }
        }
        console.log("Is game over: " + this.gameOver);
    }

    const resetGame = function(){
        Gameboard.turn = "X";
        console.log("open slot length before reset:" + Gameboard.openSlots.length);
        Gameboard.resetPlayedSquares();
        for (let i = 0; i < 9; i++){
            Gameboard.boardSlots[i].textContent = "";
        }
        console.log("open slot length after reset:" + Gameboard.openSlots.length);
        this.gameOver = false;
        this.startGame = false;
        this.turn = "X";
        adviceText.textContent = adviceText.textContent = "X's Turn!"
    }

    return {turn, gameOver, resetGame, endTurn};
})();

const Gameboard = (() => {
    //Game board consisting of 9 open spaces
    const boardSlots = [];
    //An array to track which board slots are still available to play
    let openSlots = [];

    const playSquare = function(square){
        if (Game.gameOver){
            return;
        }
        if (boardSlots[square].textContent !== ""){
            return;
        }
        boardSlots[square].textContent = Game.turn;
        const index = openSlots.indexOf(square);
        openSlots.splice(index, 1);
        console.log(openSlots.length + " spaces remaining");
        Game.endTurn();
    }

    const prepareBoard = function(){
        for (let i = 0; i < 9; i++){
            boardSlots.push(document.getElementById(i));
            openSlots.push(i);
            boardSlots[i].addEventListener('click', () =>{
                playSquare(i);
            });
        }
        console.log("Open spaces" + openSlots.length);
        console.log("Number of squares: " + boardSlots.length);
    }

    const resetPlayedSquares = function(){
        openSlots = [];
        for (let i = 0; i < 9; i++){
            openSlots.push(i);
        }
    }

    const checkForWin = function(){
        let boardFull = true;
        for (let i = 0; i < 3; i++){
            //scans the board vertically and horizontally, looking for 3 in a row
            let boardStatusX = boardSlots[i*3].textContent;
            boardStatusX += boardSlots[(i*3)+1].textContent;
            boardStatusX += boardSlots[(i*3)+2].textContent;
            let boardStatusY = boardSlots[i%3].textContent;
            boardStatusY += boardSlots[(i%3)+3].textContent;
            boardStatusY += boardSlots[(i%3)+6].textContent;
            if (boardStatusX === "XXX" || boardStatusY === "XXX"){
                return "X";
            }
            else if (boardStatusX === "OOO" || boardStatusY === "OOO"){
                return "O"
            }
        }
        //bruteforce check (since there are just two cases) if there is a diagonal win
        let boardDiagonal1 = boardSlots[2].textContent + boardSlots[4].textContent + boardSlots[6].textContent;
        let boardDiagonal2 = boardSlots[0].textContent + boardSlots[4].textContent + boardSlots[8].textContent;
        if (boardDiagonal1 === "XXX" || boardDiagonal2 === "XXX"){
            return "X";
        }
        else if (boardDiagonal1 === "OOO" || boardDiagonal2 === "OOO"){
            return "O";
        }
        else if (openSlots.length === 0){
            return "D"; //for 'draw'
        }
    }

    return {
        boardSlots, openSlots, resetPlayedSquares, prepareBoard, checkForWin
    };
})();

const Player = (name) => {
    return {name};
}
function playSquare(square){
    if (!Game.gameOver){
        Gameboard.playSquare(square);
    }
}

Gameboard.prepareBoard();