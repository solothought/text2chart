import { 
  MarkerType
  } from '@xyflow/svelte';

// TODO: when an edge is highlighted by click, set it's z-index to 1 then reset to 0;
export const edgeStyle = "stroke-width: 2px; stroke: #cac2c2;";
export const highlightedEdgeStyle = "stroke-width: 2px; stroke: #FF4000";
export const labelStyle = "font-size: 10px; font-weight: inherit; color: inherit;";
export const highlightedLabelStyle = "font-size: 16px; font-weight: bold; color: #ff6347;";
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

/**
 * 
 * @param {[]} nodes 
 * @param {[]} edges 
 * @param {Set<string>} nodeIds 
 * @param {Set<string>} edgeIds 
 * @returns 
 */
export function highlight(nodes, edges, nodeIds, edgeIds) {
  updateNodesStyle(nodes, nodeIds, true);
  updateEdgesStyle(edges, edgeIds, highlightEdge);
}

export function unhighlight(nodes, edges, nodeIds, edgeIds) {
  updateNodesStyle(nodes, nodeIds, false);
  updateEdgesStyle(edges, edgeIds, unhighlightEdge);
}

export function updateNodesStyle(nodes,nodeIds,shouldHighlight){
  nodes.forEach(node => {
    if(nodeIds.has(node.id)){
      //This creates a new object that ensures that Svelte's reactivity system detects the change
      node.data = {
        ...node.data,
        highlight: shouldHighlight
      };
    }
  })
}

/**
 * 
 * @param {[]} edges master data
 * @param {string[]} edgeIds edges to update
 * @param {function} cb function that apply style
 */
export function updateEdgesStyle(edges,edgeIds, cb){
  edges.forEach(edge => {
    if(edgeIds.has(edge.id)){
      cb(edge);
    }
  })
}

/**
 * apply edge and it's marker's style
 * @param {object} edge 
 */
export function unhighlightEdge(edge){
  edge.style = edgeStyle;
  edge.markerEnd = edgeMarkerStyle;
  edge.labelStyle = labelStyle;
}

/**
 * apply edge and it's marker's style
 * @param {object} edge 
 */
export function highlightEdge(edge){
  edge.style = highlightedEdgeStyle;
  edge.markerEnd = highlightedEdgeMarkerStyle;
  edge.labelStyle = highlightedLabelStyle;
}