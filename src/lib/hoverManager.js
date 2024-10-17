import { 
  MarkerType
  } from '@xyflow/svelte';

export const edgeStyle = "stroke-width: 2px; stroke: #cac2c2;";
export const highlightedEdgeStyle = "stroke-width: 2px; stroke: #FF4000";

export const edgeMarkerStyle = { 
  type: MarkerType.ArrowClosed,
  width: 20, 
  height: 20, 
  color: '#cac2c2' };
export const highlightedEdgeMarkerStyle = { 
  type: MarkerType.ArrowClosed,
  width: 20, 
  height: 20, 
  color: "#FF4000" };


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
  
  edges.forEach(edge => {
    if(edgeIds.has(edge.id)){
      // edge.data = {
      //   ...edge.data,
      //   highlight: true
      // };
      // if(edge.class) edge.class = " highlighted-edge";
      // else edge.class += " highlighted-edge";
      edge.style = highlightedEdgeStyle;
      edge.markerEnd = highlightedEdgeMarkerStyle;
    }
  })
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
  
  edges.forEach(edge => {
    if(edgeIds.has(edge.id)){
      // edge.data = {
      //   ...edge.data,
      //   highlight: false
      // };
      // console.log(edge.class);
      // const classes = edge.class.split(" ");
      // edge.class = "";
      // classes.forEach(cls => {
      //   if(cls !== "highlighted-edge") edge.class += cls
      // })
      edge.style = edgeStyle;
      edge.markerEnd = edgeMarkerStyle;
    }
  })
}
