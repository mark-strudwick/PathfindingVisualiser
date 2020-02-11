const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 800;

const floor = Math.floor;

const rows = 32;
const columns = 40;
const nodeSize = 25;

const mouse = {
    x: undefined,
    y: undefined,
    dx: undefined,
    dy: undefined,
    down: false
}

class Board {
    constructor() {
        this.nodes = new Array(columns);

        for (let column = 0; column < columns; column++) {
            this.nodes[column] = new Array(rows);
            for (let row = 0; row < rows; row++) {
                if (column == 10 && row == 8) {
                    var isStart = true;
                }
                else {
                    var isStart = false;
                }
                if (column == 10 && row == 10) {
                    var isFinish = true;
                }
                else {
                    var isFinish = false;
                }
                this.nodes[column][row] = new Node(column, row, isStart, isFinish, false);
            }

        }
    }
    drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.nodes[i][j].draw();
            }
        }
    }
    updateBoard() {
        if (mouse.down == true) {
            if (this.nodes[mouse.dx][mouse.dy].isStart == true) {
                this.nodes[mouse.dx][mouse.dy].isStart = false;
                this.nodes[mouse.x][mouse.y].isStart = true;
            } else if (this.nodes[mouse.dx][mouse.dy].isFinish == true) {
                this.nodes[mouse.dx][mouse.dy].isFinish = false;
                this.nodes[mouse.x][mouse.y].isFinish = true;
            } else {
                this.nodes[mouse.x][mouse.y].clicked();
            }
            this.drawBoard();
        }
    }

}

class Node {
    constructor(row, column, isStart, isFinish, isWall) {
        this.row = row;
        this.column = column;
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.isWall = isWall;
        this.distance = null;
        this.isVisited = false;
        this.previousNode = null;
    }
    getColour() {
        if (this.isStart == true) {
            return "#17b978";

        } else if (this.isFinish == true) {
            return "#f85959";

        } else if (this.isWall == true) {
            return "black";
        }
    }
    draw() {
        if (this.isStart == true || this.isFinish == true || this.isWall == true) {
            ctx.fillStyle = this.getColour();
            ctx.fillRect(this.row * nodeSize, this.column * nodeSize, nodeSize, nodeSize);
        }
        else {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fccde2";
            ctx.strokeRect(this.row * nodeSize, this.column * nodeSize, nodeSize, nodeSize);
        }
    }
    clicked() {
        this.isWall = !this.isWall;
    }
}

function setMouse(e) {
    let rect = canvas.getBoundingClientRect()
    changeX = mouse.x
    changeY = mouse.y
    mouse.x = floor((e.clientX - rect.left) / nodeSize)
    mouse.y = floor((e.clientY - rect.top) / nodeSize)
    if (changeX !== mouse.x) {
        mouse.dx = changeX;
    } else if (changeY !== mouse.Y) {
        mouse.dy = changeY;
    }
    board.updateBoard();
}

canvas.onmousedown = (e) => {
    mouse.button = e.which
    mouse.down = true
    setMouse(e)
}

canvas.onmousemove = setMouse

canvas.onmouseup = () => (mouse.down = false)

canvas.oncontextmenu = (e) => e.preventDefault()

let board = new Board();
board.drawBoard();
