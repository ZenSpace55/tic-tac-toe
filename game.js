const Game = (() => {

    let turn = "X";

    const endTurn = function(){

        console.log("attempting turn switch");
        let gameEnded = Gameboard.checkForWin();
        if (gameEnded === "X"){
            console.log("x victory");
        }
        else if (gameEnded === "O"){
            console.log("o victory");
        }
        else if (gameEnded === "D"){
            console.log("board full, DRAW");
        }
        else console.log("game continues" + gameEnded);
        if (this.turn === "X"){
            this.turn = "O";
        }
        else{
            this.turn = "X";
        }
    }

    return {turn, endTurn};
})();

const Gameboard = (() => {
    //Game board consisting of 9 open spaces
    const boardSlots = [];
    //An array to track which board slots are still available to play
    const openSlots = [];

    const playSquare = function(square){
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
        console.log("slot three: " + boardSlots[2].textContent);
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
        boardSlots, prepareBoard, checkForWin
    };
})();

const Player = (name) => {
    return {name};
}

function renderBoard(){

}

function InitializeGame(){

}

function playSquare(square){
    Gameboard.playSquare(square);
}

Gameboard.prepareBoard();