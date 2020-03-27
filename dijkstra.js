function dijkstra(grid) {
    const visitedNodesInOrder = [];
    grid.setStartNodeDistance(0);
    const unvisitedNodes = grid.grid.flat();
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall === true) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder, grid.drawGrid();
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.isFinish == true) return visitedNodesInOrder, grid.drawGrid();
        grid.grid[closestNode.column][closestNode.row].getNeighbours();
        unvisitedNeighbours = closestNode.neighbours;
        for (const neighbour of unvisitedNeighbours) {
            if (neighbour.isVisited == true) {
                continue
            } else {
                neighbour.distance = closestNode.distance + 1;
                neighbour.previousNode = closestNode;
            }
        }

    }
}