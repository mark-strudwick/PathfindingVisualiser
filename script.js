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
    getStartNode() {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                let node = this.nodes[i][j]
                if (node.isStart == true) {
                    return node;
                }
            }
        }
    }
    getFinishNode() {
        for (let i = 0; i < this.nodes.length - 1; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                let node = this.nodes[i][j]
                if (node.isFinish == true) {
                    return node;
                }
            }
        }
    }
    setStartNodeDistance(distance) {
        this.getStartNode().distance = distance;
    }
    getNeighbours(node) {
        //top
        if (node.column > 0 && this.nodes[node.column - 1][node.row]) {
            this.nodes[node.column][node.row].neighbours.push(this.nodes[node.column - 1][node.row]);
        }

        //bottom
        if (node.column < this.nodes.length - 1 && this.nodes[node.column + 1][node.row]) {
            this.nodes[node.column][node.row].neighbours.push(this.nodes[node.column + 1][node.row]);
        }

        //left
        if (this.nodes[node.column][node.row - 1]) {
            this.nodes[node.column][node.row].neighbours.push(this.nodes[node.column][node.row - 1]);
        }

        //right
        if (this.nodes[node.column][node.row + 1]) {
            this.nodes[node.column][node.row].neighbours.push(this.nodes[node.column][node.row + 1]);
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
        this.distance = Infinity;
        this.isVisited = false;
        this.previousNode = null;
        this.neighbours = [];
    }
    getColour() {
        if (this.isStart == true) {
            return "#17b978";
        } else if (this.isFinish == true) {
            return "#f85959";
        } else if (this.isWall == true) {
            return "black";
        } else if (this.isVisited == true) {
            return "yellow";
        }
    }
    draw() {
        if (this.isStart == true || this.isFinish == true || this.isWall == true || this.isVisited) {
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

function dijkstra(board) {
    const visitedNodesInOrder = [];
    board.setStartNodeDistance(0);
    const unvisitedNodes = board.nodes.flat();
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall === true) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder, board.drawBoard();
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish == true) return visitedNodesInOrder, board.drawBoard();
        board.getNeighbours(board.nodes[closestNode.column][closestNode.row]);
        unvisitedNeighbours = closestNode.neighbours;
        for (const neighbour of unvisitedNeighbours) {
            neighbour.distance = closestNode.distance + 1;
            neighbour.previousNode = closestNode;
        }
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
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
