const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const rows = 25;
const columns = 50;
const nodeSize = 20;

class Board {
    constructor() {
        this.nodes = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let node = new Node(r, c);
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
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    draw() {
        ctx.strokeRect(this.column * nodeSize, this.row * nodeSize, nodeSize, nodeSize);
    }
}

let board = new Board();
board.drawBoard();
