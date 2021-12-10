const Gameboard = (() => {
    //Game board consisting of 9 open spaces
    const boardSlots = [];
    //An array to track which board slots are still available to play
    const openSlots = [];
    const checkForWin = function(){
        let boardFull = true;
        for (let i = 0; i < 3; i++){
            //scans the board vertically and horizontally, looking for 3 in a row
            let boardStatusX = boardSlots[i*3];
            boardStatusX += boardSlots[(i*3)+1];
            boardStatusX += boardSlots[(i*3)+2];
            let boardStatusY = boardSlots[i%3];
            boardStatusY += broadSlots[(i%3)+3];
            boardStatusY += boardSlots[(i%3)+6];
            if (boardStatusX === "XXX" || boardStatusY === "XXX"){
                //X win
            }
            else if (boardStatusX === "OOO" || boardStatusY === "OOO"){
                ///O win
            }
        }
        //bruteforce check (since there are just two cases) if there is a diagonal win
        let boardDiagonal1 = boardSlots[2] + boardSlots[4] + boardSlots[6];
        let boardDiagonal2 = boardSlots[0] + boardSlots[4] + boardSlots[8];
        if (boardDiagonal1 === "XXX" || boardDiagonal2 === "XXX"){
            //X win
        }
        else if (boardDiagonal1 === "OOO" || boardDiagonal2 === "OOO"){
            ///O win
        }
        if (openSlots.length === 0){
            //no open slots left, no winner, game = draw
        }
    }

    return {
        boardSlots, checkForWin
    };
})();

const Player = (name) => {
    return {name};
}

function InitializeGame(){

}