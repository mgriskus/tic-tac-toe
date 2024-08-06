const ticTacToe = function() {
    function makePlayer(marker) {
        let playerMarker = marker;
        function getMarker() {
            return playerMarker;
        }
        return {getMarker};
    }

    const gameboard = function() {
        let board;
        function resetBoard() {
            board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
        }
        resetBoard();
        function showBoard() {
            return board;
        }
        function markTile(row, column, player) {
            if (board[row][column] != '_') {
                return false;
            }
            board[row][column] = player.getMarker();
            return true;
        }
        function getTileMarker(row, column) {
            return board[row][column];
        }
        return {resetBoard, showBoard, getTileMarker, markTile};
    }();

    const endChecker = function(gameboard) {
        function checkRow(row) {
            for (let column = 1; column < 3; ++column) {
                if (gameboard.getTileMarker(row, 0) != gameboard.getTileMarker(row, column)) return '_';
            }
            return gameboard.getTileMarker(row, 0);
        }
        function checkColumn(column) {
            for (let row = 1; row < 3; ++row) {
                if (gameboard.getTileMarker(0, column) != gameboard.getTileMarker(row, column)) return '_';
            }
            return gameboard.getTileMarker(0, column);
        }
        function checkDiagonal1() {
            return (gameboard.getTileMarker(0, 0) == gameboard.getTileMarker(1, 1) && gameboard.getTileMarker(1, 1) == gameboard.getTileMarker(2, 2) ? gameboard.getTileMarker(0, 0) : '_');
        }
        function checkDiagonal2() {
            return (gameboard.getTileMarker(0, 2) == gameboard.getTileMarker(1, 1) && gameboard.getTileMarker(1, 1) == gameboard.getTileMarker(2, 0) ? gameboard.getTileMarker(0, 2) : '_');
        }
        function check() {
            for (let i = 0; i < 3; ++i) {
                let rowResult = checkRow(i);
                if (rowResult != '_') {
                    return rowResult;
                }
                let columnResult = checkColumn(i)
                if (columnResult != '_') {
                    return columnResult;
                }
            }
            let diagonal1Result = checkDiagonal1();
            if (diagonal1Result != '_') {
                return diagonal1Result;
            }
            let diagonal2Result = checkDiagonal2();
            if (diagonal2Result != '_') {
                return diagonal2Result;
            }
            return '_';
        }
        return {check, checkRow, checkColumn};
    }(gameboard);

    function playRound(player1, player2) {
        let turns = 9;
        let winner = '_';
        while (winner == '_' && turns > 0) {
            const currentPlayer = (turns % 2 ? player1 : player2);
            let row;
            let column;
            while (true) {
                row = prompt(`On which row do you want to place the marker ${currentPlayer.getMarker()}?`);
                column = prompt(`In which column do you want to place the marker ${currentPlayer.getMarker()}?`);
                if (gameboard.markTile(row, column, currentPlayer)) break;
                alert("Tile is already marked. Try again.");
            }
            console.table(gameboard.showBoard());
            --turns;
            winner = endChecker.check();
        }
        if (winner == '_') {
            alert("It's a tie!");
        } else {
            alert(`The winner is ${winner}!`);
        }
        return winner;
    }

    function play() {
        const player1 = makePlayer('X');
        const player2 = makePlayer('Y');
        for (let i = 0; i < 3; ++i) {
            playRound(player1, player2);
            gameboard.resetBoard();
        }
    }

    return {play};
}();

ticTacToe.play();