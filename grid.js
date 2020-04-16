class Grid {
    constructor(columns, rows, nodeSize) {

        this.columns = columns;
        this.rows = rows;
        this.nodeSize = nodeSize;

        this.grid = [];
    }

    createGrid() {

        // Creates a 2D array of nodes
        for (let i = 0; i < this.columns; i++) {
            this.grid[i] = [];
        }

        // Creates start and finish node positions to be proportionate to canvas size
        let startColumn = round(columns / 4);
        let startRow = round(rows / 2) - 1;
        let finishColumn = round(columns - (columns / 4));
        let finishRow = round(rows / 2) - 1;

        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                if (column == startColumn && row == startRow) {
                    var isStart = true;
                }
                else {
                    var isStart = false;
                }
                if (column == finishColumn && row == finishRow) {
                    var isFinish = true;
                }
                else {
                    var isFinish = false;
                }
                this.grid[column][row] = new Node(column, row, this.nodeSize, isStart, isFinish, false, this.grid);
            }
        }
    }

    drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                this.grid[column][row].draw();
            }
        }
    }

    updateGrid() {
        if (mouse.down == true) {
            if (this.grid[changeX][changeY].isStart == true) {
                this.grid[changeX][changeY].isStart = false;
                this.grid[mouse.x][mouse.y].isStart = true;
            } else if (this.grid[changeX][changeY].isFinish == true) {
                this.grid[changeX][changeY].isFinish = false;
                this.grid[mouse.x][mouse.y].isFinish = true;
            } else if (mouse.x !== changeX || mouse.y !== changeY) {
                this.grid[mouse.x][mouse.y].clicked();
            }
            this.drawGrid();
        }
    }

    getStartNode() {
        for (let i = 0; i < this.grid.length - 1; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let node = this.grid[i][j]
                if (node.isStart == true) {
                    return node;
                }
            }
        }
    }

    getFinishNode() {
        for (let i = 0; i < this.grid.length - 1; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let node = this.grid[i][j]
                if (node.isFinish == true) {
                    return node;
                }
            }
        }
    }

    setStartNodeDistance(distance) {
        this.getStartNode().distance = distance;
    }

    // Clears any previous searches
    resetGrid() {
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                this.grid[column][row].neighbours = [];
                this.grid[column][row].previousNode = null;
                this.grid[column][row].isVisited = false;
                this.grid[column][row].distance = Infinity;

            }
        }
    }
}

