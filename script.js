const ticTacToe = function () {
    function makePlayer(marker) {
        let playerMarker = marker;
        function getMarker() {
            return playerMarker;
        }
        return { getMarker };
    }

    const player1 = makePlayer('X');
    const player2 = makePlayer('Y');

    const gameboard = function () {
        let board;
        let active = false;
        function reset() {
            board = [['', '', ''], ['', '', ''], ['', '', '']];
            active = true;
        }
        reset();
        function deactivate() {
            active = false;
        }
        function markSquare(row, column, player) {
            if (board[row][column] != '' || !active) {
                return false;
            }
            board[row][column] = player.getMarker();
            return true;
        }
        function getSquareMarker(row, column) {
            return board[row][column];
        }
        return { reset, getSquareMarker, markSquare, deactivate };
    }();

    const turnHandler = function () {
        let activePlayer = player1;
        let turnsLeft = 9;
        function getActivePlayer() {
            return activePlayer;
        }
        function switchActivePlayer() {
            activePlayer = (activePlayer == player1 ? player2 : player1);
            userInterface.updateInfo();
            --turnsLeft;
        }
        function getTurnsLeft() {
            return turnsLeft;
        }
        function reset() {
            activePlayer = player1;
            turnsLeft = 9;
        }
        return { getActivePlayer, switchActivePlayer, getTurnsLeft, reset };
    }();

    const endChecker = function () {
        function checkRow(row) {
            for (let column = 1; column < 3; ++column) {
                if (gameboard.getSquareMarker(row, 0) != gameboard.getSquareMarker(row, column)) return '';
            }
            return gameboard.getSquareMarker(row, 0);
        }
        function checkColumn(column) {
            for (let row = 1; row < 3; ++row) {
                if (gameboard.getSquareMarker(0, column) != gameboard.getSquareMarker(row, column)) return '';
            }
            return gameboard.getSquareMarker(0, column);
        }
        function checkDiagonal1() {
            return (gameboard.getSquareMarker(0, 0) == gameboard.getSquareMarker(1, 1) && gameboard.getSquareMarker(1, 1) == gameboard.getSquareMarker(2, 2) ? gameboard.getSquareMarker(0, 0) : '');
        }
        function checkDiagonal2() {
            return (gameboard.getSquareMarker(0, 2) == gameboard.getSquareMarker(1, 1) && gameboard.getSquareMarker(1, 1) == gameboard.getSquareMarker(2, 0) ? gameboard.getSquareMarker(0, 2) : '');
        }
        function check() {
            for (let i = 0; i < 3; ++i) {
                let rowResult = checkRow(i);
                if (rowResult != '') {
                    return rowResult;
                }
                let columnResult = checkColumn(i)
                if (columnResult != '') {
                    return columnResult;
                }
            }
            let diagonal1Result = checkDiagonal1();
            if (diagonal1Result != '') {
                return diagonal1Result;
            }
            let diagonal2Result = checkDiagonal2();
            if (diagonal2Result != '') {
                return diagonal2Result;
            }
            if (!turnHandler.getTurnsLeft()) {
                return "No one";
            }
            return '';
        }
        return { check, checkRow, checkColumn };
    }();

    function reset() {
        gameboard.reset();
        turnHandler.reset();
        userInterface.updateInfo();
        userInterface.showBoard();
        document.removeEventListener("click", reset);
    }

    const userInterface = function () {
        function showBoard() {
            for (let row = 0; row < 3; ++row) {
                for (let column = 0; column < 3; ++column) {
                    document.querySelector(`.row${row}.column${column} div`).textContent = gameboard.getSquareMarker(row, column);
                }
            }
        }
        function updateInfo() {
            document.querySelector(".info").textContent = `Turn of ${turnHandler.getActivePlayer().getMarker()}`;
        }
        function start() {
            for (let row = 0; row < 3; ++row) {
                for (let column = 0; column < 3; ++column) {
                    const play = () => {
                        const success = gameboard.markSquare(row, column, turnHandler.getActivePlayer());
                        if (success) {
                            turnHandler.switchActivePlayer();
                            const end = endChecker.check();
                            if (end != '') {
                                gameboard.deactivate();
                                document.querySelector(".info").textContent = `${end} wins! (Double click to play again.)`;
                                document.addEventListener("dblclick", reset);
                            }
                            showBoard();
                        }
                    }
                    document.querySelector(`.row${row}.column${column}`).addEventListener("click", play);
                }
            }
        }
        return { showBoard, start, updateInfo };
    }();

    return { userInterface };
}();

ticTacToe.userInterface.start();