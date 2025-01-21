/**
 * Select nodes to handle hover over a node
 * @param {number} nodeId 
 * @param {Object} connections 
 * @param {Set<number>} nodeSet 
 * @param {Set<number>} edgeSet 
 */
export function traverseConnections(nodeId, connections, selectDirection) {
  const nSetUp = new Set();
  const eSetUp = new Set();
  const nSetDown = new Set();
  const eSetDown = new Set();

  if(selectDirection === 0 || selectDirection === 2)
    traverseUpwards(nodeId, connections, nSetUp, eSetUp);
  if(selectDirection === 1 || selectDirection === 2)
    traverseDownwards(nodeId, connections, nSetDown, eSetDown);

  return {
    seletedNodes: new Set([...nSetUp, ...nSetDown]),
    seletedEdges: new Set([...eSetUp, ...eSetDown])
  }
}

function traverseUpwards(currentNode, connections, nodeSet, edgeSet) {
  if (!nodeSet.has(currentNode)) {
    nodeSet.add(currentNode);
    connections[currentNode].parent.forEach(parentNode => {
      edgeSet.add(`${parentNode}-${currentNode}`);
      traverseUpwards(parentNode, connections, nodeSet, edgeSet);
    });
  }
}

function traverseDownwards(currentNode, connections, nodeSet, edgeSet) {
  if (!nodeSet.has(currentNode)) {
    nodeSet.add(currentNode);
    connections[currentNode].target.forEach(targetNode => {
      edgeSet.add(`${currentNode}-${targetNode}`);
      traverseDownwards(targetNode, connections, nodeSet, edgeSet);
    });
  }
}
