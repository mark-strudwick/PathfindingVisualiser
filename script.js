const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const floor = Math.floor;
const abs = Math.abs;
const round = Math.round;

canvas.width = window.innerWidth - (window.innerWidth / 4);
canvas.height = window.innerHeight - (window.innerHeight / 4);

const nodeSize = 25;
const rows = round(canvas.height / nodeSize);
const columns = round(canvas.width / nodeSize);

const mouse = {
    x: undefined,
    y: undefined,
    dx: undefined,
    dy: undefined,
    down: false
}

function getDistance(nodeA, nodeB) {
    return abs(nodeA.column - nodeB.column) + abs(nodeA.row - nodeB.row)
}

function drawDijkstra(grid) {
    dijkstra(grid)
    drawShortestPath(grid);
}

function drawAStar(grid) {
    aStar(grid);
    drawShortestPath(grid);
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

function drawShortestPath(board) {
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(board.getFinishNode());
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
        node = nodesInShortestPathOrder[i]
        ctx.fillStyle = "green";
        ctx.fillRect(node.row * nodeSize, node.column * nodeSize, nodeSize, nodeSize);
    }
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText(nodesInShortestPathOrder.length - 1, 50, 50);
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
    grid.updateBoard();
}

canvas.onmousedown = (e) => {
    mouse.button = e.which
    mouse.down = true
    setMouse(e)
}

canvas.onmousemove = setMouse

canvas.onmouseup = () => (mouse.down = false)

canvas.oncontextmenu = (e) => e.preventDefault()

let grid = new Grid(columns, rows, nodeSize);
grid.createGrid();
grid.drawGrid();