export function toggleNodeCollapse(nodes, edges, node) {
  toggleHide(nodes, edges,node.data.collapsable,findNodes(nodes, node), node);
  node.data = { ...node.data, collapsable: !node.data.collapsable };
}

/**
 * Find all the indexes whose indent is more than indent of given node 
 * @param {[]} nodes 
 * @param {object} node 
 * @returns {number[]} indexes of nodes[]
 */
function findNodes(nodes, node) {
  const nodeIndexes = [];
  const parentIndent = node.data.indent;
  
  for (let i = node.data.index + 1; i < nodes.length; i++) {
    const currentNode = nodes[i];
    
    if (currentNode.data.indent <= parentIndent) break;
    
    // If the current node is collapsed, skip all its children
    if (currentNode.data.collapsable === false) {
      i = findSiblingOrHigherNodeIndex(nodes,i);
    }
    
    nodeIndexes.push(currentNode.id);
  }
  
  return nodeIndexes;
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
function toggleHide(nodes, edges, state, selectedNodeIds, parentNode){
  //Show/Hide nodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(selectedNodeIds.includes(node.id))
      node.hidden = state;
  }

  //Show/Hide edges
  if(!state) showEdges(edges,selectedNodeIds,parentNode);
  else hideEdges(edges,selectedNodeIds,parentNode);
}

function showEdges(edges,selectedNodeIds,parentNode){
  edges.forEach(edge => {
    if(selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)){
      edge.hidden = false;
    }else if(edge.source === parentNode.id){
      edge.hidden = false;
    }
  })
}

function hideEdges(edges,selectedNodeIds,parentNode){
  edges.forEach(edge => {
    if(selectedNodeIds.includes(edge.source) || selectedNodeIds.includes(edge.target)){
      edge.hidden = true;
    }else if(edge.source === parentNode.id){
      edge.hidden = true;
    }
  })
}