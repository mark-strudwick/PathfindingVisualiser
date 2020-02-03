const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 800;

const rows = 32;
const columns = 80;
const nodeSize = 25;

const mouse = {
    x: undefined,
    y: undefined,
    px: undefined,
    py: undefined,
    down: false
}

class Board {
    constructor() {
        this.nodes = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (r == 12 && c == 5) {
                    var isStart = true;
                }
                else {
                    var isStart = false;
                }
                if (r == 12 && c == 44) {
                    var isFinish = true;
                }
                else {
                    var isFinish = false;
                }
                let node = new Node(r, c, isStart, isFinish, false);
                this.nodes.push(node);
            }
        }
    }

    drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }
    }
    getStartNode() {
        return board.nodes.findIndex(node => node.isStart == true)
    }
}

class Node {
    constructor(row, column, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp) {
        this.row = row;
        this.column = column;
        this.isStart = isStart;
        this.isFinish = isFinish;
        this.isWall = isWall;
        this.onMouseDown = onMouseDown;
        this.onMouseEnter = onMouseEnter;
        this.onMouseUp = onMouseUp;
    }

    draw() {
        if (this.isStart == true) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        } else if (this.isFinish == true) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        } else if (this.isWall == true) {
            ctx.fillStyle = "black";
            ctx.fillRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        } else {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        }

    }
}

function setMouse(e) {
    let rect = canvas.getBoundingClientRect()
    mouse.px = mouse.x
    mouse.py = mouse.y
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top

    if (mouse.down == true && board.nodes[board.getStartNode()].column == Math.floor(mouse.x / nodeSize) && board.nodes[board.getStartNode()].row == Math.floor(mouse.y / nodeSize)) {
        board.nodes[board.getStartNode()].isStart = false;
        board.nodes[board.nodes.findIndex(node => node.column == Math.floor(mouse.px / nodeSize) && node.row == Math.floor(mouse.py / nodeSize))].isStart = true;
    } else if (mouse.down == true) {
        board.nodes[board.nodes.findIndex(node => node.column == Math.floor(mouse.x / nodeSize) && node.row == Math.floor(mouse.y / nodeSize))].isWall ^= true;
        board.drawBoard();
    }

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

// #c5e3f6 (blue), #fc5c9c (darkpink), #fccde2 (lightpink), #fcefee (cream)
