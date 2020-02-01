const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const rows = 25;
const columns = 50;
const nodeSize = 20;

const mouse = {
    x: undefined,
    y: undefined,
    down: false
}

window.addEventListener("mousemove", function (e) {
    mouse.x = event.x;
    mouse.y = event.y;
});

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
                let node = new Node(r, c, isStart, isFinish);
                this.nodes.push(node);
            }
        }
    }

    drawBoard() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }
    }
}

class Node {
    constructor(row, column, isStart, isFinish) {
        this.row = row;
        this.column = column;
        this.isStart = isStart;
        this.isFinish = isFinish;
    }

    draw() {
        if (this.isStart == true) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        } else if (this.isFinish == true) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        } else {
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
        }

    }
}


/*function setMouse(e) {
    let rect = canvas.getBoundingClientRect()
    mouse.px = mouse.x
    mouse.py = mouse.y
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
    console.log(mouse.x, mouse.y);
    console.log(rect);
    ctx.clearRect
}

canvas.onmousedown = (e) => {
    mouse.button = e.which
    mouse.down = true
    setMouse(e)
}

canvas.onmouseup = () => (mouse.down = false)*/

let board = new Board();
board.drawBoard();
