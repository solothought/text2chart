export function toggleNodeCollapse(nodes, edges, node, nodesIndex) {
  toggleHide(nodes, edges,node.data.collapsable,findExpandedChildNodes(nodes, node), node, nodesIndex);
  node.data = { ...node.data, collapsable: !node.data.collapsable };
}

/**
 * Find all the indexes whose indent is more than indent of given node 
 * @param {[]} nodes 
 * @param {object} node 
 * @returns {number[]} indexes of nodes[]
 */
function findExpandedChildNodes(nodes, node) {
  const nodeIds = [];
  const parentIndent = node.data.indent;
  
  for (let i = node.data.index + 1; i < nodes.length; i++) {
    const currentNode = nodes[i];
    
    if (currentNode.data.indent <= parentIndent) break;
    
    // If the current node is collapsed, skip all its children
    if (currentNode.data.collapsable === false) {
      i = findSiblingOrHigherNodeIndex(nodes,i);
    }
    
    nodeIds.push(currentNode.id);
  }
  
  return nodeIds;
}

/**
 * Find index of next step of same or higher indent level
 * @param {[]} nodes 
 * @param {number} index 
 * @returns {number}
 */
function findSiblingOrHigherNodeIndex(nodes, index){
  const currentIndent = nodes[index].data.indent;
  for (let i=index+1; i < nodes.length; i++) {
    const node = nodes[i];
    if(currentIndent >= node.data.indent) return --i;
  }
}

/**
 * Set hidden property of relevant edges and nodes
 * @param {[]} nodes
 * @param {[]} edges 
 * @param {boolean} state to set hidden property to hide or show
 * @param {string[]} selectedNodeIds indexes of nodes array
 * @param {string} parentNode node clicked
 */
function toggleHide(nodes, edges, state, selectedNodeIds, parentNode, nodesIndex){
  //Show/Hide nodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(selectedNodeIds.includes(node.id))
      node.hidden = state;
  }

  //Show/Hide edges
  if(!state) showEdges(nodes, edges, parentNode, nodesIndex);
  else hideEdges(nodes, edges,parentNode, nodesIndex);
}

function showEdges(nodes, edges, parentNode, nodesIndex){
  edges.forEach(edge => {
    if(!nodes[nodesIndex[edge.target]].hidden && !nodes[nodesIndex[edge.source]].hidden){
      edge.hidden = false;
    }else if(edge.source === parentNode.id){
      edge.hidden = false;
    }
  })
}

function hideEdges(nodes, edges, parentNode, nodesIndex){
  edges.forEach(edge => {
    if(nodes[nodesIndex[edge.target]].hidden || nodes[nodesIndex[edge.source]].hidden){
      edge.hidden = true;
    }else if(edge.source === parentNode.id){
      edge.hidden = true;
    }
  })
}

/**
 * Collapse all nodes under given node
 * @param {[]} nodes 
 * @param {{}} node 
 * @returns 
 */
export function collapseAllChildren(nodes, edges, node, nodesIndex){
  const nodeIds = [];
  const parentIndent = node.data.indent;
  
  for (let i = node.data.index + 1; i < nodes.length; i++) {
    const currentNode = nodes[i];
    
    if (currentNode.data.indent <= parentIndent) break;
    
    if (currentNode.data.collapsable === false || currentNode.data.collapsable === true) {
      currentNode.data = { ...currentNode.data, collapsable: false };
    }
    
    nodeIds.push(currentNode.id);
  }
  
  toggleHide(nodes, edges,true,nodeIds, node, nodesIndex);
  node.data = { ...node.data, collapsable: false };
}

export function expandAllChildren(nodes, edges, node, nodesIndex){
  const nodeIds = [];
  const parentIndent = node.data.indent;
  
  for (let i = node.data.index + 1; i < nodes.length; i++) {
    const currentNode = nodes[i];
    
    if (currentNode.data.indent <= parentIndent) break;
    
    if (currentNode.data.collapsable === false || currentNode.data.collapsable === true) {
      currentNode.data = { ...currentNode.data, collapsable: true };
    }
    
    nodeIds.push(currentNode.id);
  }
  
  toggleHide(nodes, edges, false, nodeIds, node, nodesIndex);
  node.data = { ...node.data, collapsable: true };
}
