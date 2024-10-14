// import { 
//   Node, 
//   Edge
//   } from '@xyflow/svelte';


// Function to handle hover over a node
export function traverseConnections(nodeId, connections, nodeSet, edgeSet) {
  // Traverse upwards (source) and downwards (target)
  function traverseUpwards(currentNode) {
    if (!nodeSet.has(currentNode)) {
      nodeSet.add(currentNode);
      connections[currentNode].source.forEach(sourceNode => {
        edgeSet.add(`${sourceNode}-${currentNode}`);
        traverseUpwards(sourceNode);
      });
    }
  }

  function traverseDownwards(currentNode) {
    if (!nodeSet.has(currentNode)) {
      nodeSet.add(currentNode);
      connections[currentNode].target.forEach(targetNode => {
        edgeSet.add(`${currentNode}-${targetNode}`);
        traverseDownwards(targetNode);
      });
    }
  }

  traverseUpwards(nodeId);
  traverseDownwards(nodeId);
}

/**
 * 
 * @param {[]} nodes 
 * @param {[]} edges 
 * @param {Set<string>} nodeIds 
 * @param {Set<string>} edgeIds 
 * @returns 
 */
export function highlight(nodes, edges, nodeIds, edgeIds) {
  nodes.forEach(node => {
    if(nodeIds.has(node.id)){
      //This creates a new object that ensures that Svelte's reactivity system detects the change
      node.data = {
        ...node.data,
        highlight: true // Remove or reset the flag
      };
    }
  })
  
  // edges.forEach(edge => {
  //   if(edgeIds.has(edge.id)){
  //     // edge.class.add('highlight');
  //     edge.data.highlight=true
  //   }
  // })
}

export function unhighlight(nodes, edges, nodeIds, edgeIds) {
  nodes.forEach(node => {
    if(nodeIds.has(node.id)){
      node.data = {
        ...node.data,
        highlight: false // Remove or reset the flag
      };
    }
  })
  
  // edges.forEach(edge => {
  //   if(edgeIds.has(edge.id)){
  //     edge.class.remove('highlight');
  //   }
  // })
}
