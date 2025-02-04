export function toggleNodeCollapse(nodes, edges, node) {
  node.data.collapse = !node.data.collapse; //set state
  toggleHide(nodes, edges,node.data.collapse,findNodes(nodes, node), node);
}

/**
 * Find all the  indexes whose indent is more than indent of given node 
 * @param {[]} nodes 
 * @param {object} node 
 * @returns {number[]} indexes of nodes[]
 */
function findNodes(nodes, node) {
  const nodeIndexes = [];
  const parentIndent = node.data.indent;
  
  for (let i = node.data.index+1; i < nodes.length; i++) {
    const currentNode = nodes[i];
    if(currentNode.data.indent > parentIndent){
      nodeIndexes.push(currentNode.id);
    }else{
      break;
    }
  }
  return nodeIndexes;
}

/**
 * 
 * @param {[]} nodes
 * @param {[]} edges 
 * @param {boolean} state to set hidden property to hide or show
 * @param {string[]} selectedNodeIndexes indexes of nodes array
 * @param {string} parentNode node clicked
 */
function toggleHide(nodes, edges, state, selectedNodeIndexes, parentNode){
  //Hide nodes
  for (let i = 1; i <= selectedNodeIndexes.length; i++) {
    nodes[parentNode.data.index+i].hidden = state
  }

  //Hide edges
  edges.forEach(edge => {
    if(selectedNodeIndexes.includes(edge.source)||selectedNodeIndexes.includes(edge.target)){
      edge.hidden = state;
    }else if(edge.source === parentNode.id){
      edge.hidden = state;
    }
  })
}