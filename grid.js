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

        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                if (column == 1 && row == 1) {
                    var isStart = true;
                }
                else {
                    var isStart = false;
                }
                if (column == 6 && row == 8) {
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

    updateBoard() {
        if (mouse.down == true) {
            /*if (this.grid[mouse.x][mouse.y.isStart] == true) {
                while (mouse.down == true) {
                    if (mouse.x !== changeX || mouse.y !== changeY) {
                        console.log("ye")
                    }
                }
            }*/
            // check if mouse is in start
            // check if mouse has moved to new node
            // turn dx,dy start to false
            // set x, y start to true

            if (this.grid[mouse.dx][mouse.dy].isStart == true) {
                this.grid[mouse.dx][mouse.dy].isStart = false;
                this.grid[mouse.x][mouse.y].isStart = true;
            } else if (this.grid[mouse.dx][mouse.dy].isFinish == true) {
                this.grid[mouse.dx][mouse.dy].isFinish = false;
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
}

