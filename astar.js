function aStar(board) {
    const visitedNodesInOrder = [];
    board.setStartNodeDistance(0);
    const unvisitedNodes = grid.grid.flat();
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode.isFinish == true) return visitedNodesInOrder, grid.drawGrid();

        grid.grid[closestNode.column][closestNode.row].getNeighbours();
        unvisitedNeighbours = closestNode.neighbours;
        for (const neighbour of unvisitedNeighbours) {
            if (neighbour.isWall == true || neighbour.isVisited == true) continue;

            const newCost = closestNode.distance + getDistance(neighbour, grid.getFinishNode());
            if (newCost < neighbour.distance) {
                neighbour.distance = newCost
                neighbour.previousNode = closestNode;
            }
        }
    }
}