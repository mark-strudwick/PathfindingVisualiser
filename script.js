const floor = Math.floor;
const abs = Math.abs;
const round = Math.round;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const nodeSize = 30;
const columns = round((window.innerWidth - (window.innerWidth / 4)) / nodeSize);
const rows = round((window.innerHeight - (window.innerHeight / 4)) / nodeSize);

canvas.width = columns * nodeSize;
canvas.height = rows * nodeSize;

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
    var startTime = startClock();
    grid.resetGrid();
    grid.drawGrid();
    dijkstra(grid);
    finishTime = stopClock(startTime);
    drawShortestPath(grid, finishTime);
}

function drawAStar(grid) {
    var startTime = startClock();
    grid.resetGrid();
    grid.drawGrid();
    aStar(grid);
    var finishTime = stopClock(startTime);
    drawShortestPath(grid, finishTime);
}

// Used to sort an array into decreasing distance values
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

function drawShortestPath(grid, finishTime) {
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid.getFinishNode());
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
        node = nodesInShortestPathOrder[i]
        ctx.fillStyle = "#C0C0C0";
        ctx.fillRect(node.column * nodeSize, node.row * nodeSize, nodeSize, nodeSize);
    }

    // Displays the distance
    document.getElementById("distance").innerHTML = nodesInShortestPathOrder.length - 1;
    // Displays the time taken
    document.getElementById("time").innerHTML = finishTime;

    nodesSearched = 0
    for (let column = 0; column < grid.columns; column++) {
        for (let row = 0; row < grid.rows; row++) {
            if (grid.grid[column][row].isVisited == true) {
                nodesSearched += 1
            }
        }
    }

    // Displays the amount of nodes searched
    document.getElementById("searched").innerHTML = nodesSearched;
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