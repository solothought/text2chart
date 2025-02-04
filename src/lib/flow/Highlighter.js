import { 
  MarkerType
  } from '@xyflow/svelte';
  import {updateProperty, updatePropertyByIndexes} from './nodeUpdater.js';


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
export const defaultEdgeOptions = {
    type: 'smoothstep',
    markerEnd: edgeMarkerStyle,
    style: edgeStyle
  }
export class Highlighter{
  constructor(nodes, edges, nodeState){
    this.nodes = nodes;
    this.edges = edges;
    this.nodeState = nodeState;
    this.selectedNodes = new Set();
    this.selectedEdges = new Set();
  }
  update(nodes, edges){
    this.nodes = nodes;
    this.edges = edges;
  }
  selectPath(nodeIds, edgeIds, edgeState = {}){
    this.selectNodes(nodeIds);
    if(edgeIds) this.selectEdges(edgeIds, highlightEdge);
  }
  
  selectNodes(selectedIds){
    updateProperty(this.nodes, this.nodeState, {highlight: true}, selectedIds);
    this.selectedNodes = selectedIds;
  }
  selectNodesByIndexes(selectedIndexes){
    updatePropertyByIndexes(this.nodes, this.nodeState, {highlight: true}, selectedIndexes);
    // this.selectedNodes = selectedIds;
  }
  selectEdges(selectedIds){
    updateEdgesStyle(this.edges,  selectedIds, highlightEdge);
    this.selectedEdges = selectedIds;
  }

  unselectPath(){
    this.unselectNodes();
    if(this.selectedEdges.size > 0) this.unselectEdges(highlightEdge);
  }

  unselectNodes(){
    updateProperty(this.nodes, this.nodeState, {highlight: false}, this.selectedNodes);
    this.selectedNodes.clear();
  }
  unselectAllNodes(){
    updateProperty(this.nodes, this.nodeState, {highlight: false});
    this.selectedNodes.clear();
  }
  unselectEdges(){
    updateEdgesStyle(this.edges, this.selectedEdges, unhighlightEdge);
    this.selectedEdges.clear();
  }
  unselectAllEdges(){
    updateEdgesStyle(this.edges, null, unhighlightEdge);
    this.selectedEdges.clear();
  }

  toggleEdge(id){
    if (this.selectedEdges.has(id)) {
      this.selectedEdges.delete(id);
      updateEdgesStyle(this.edges, new Set([id]), unhighlightEdge);
    }else{
      this.selectedEdges.add(id);
      updateEdgesStyle(this.edges, new Set([id]), highlightEdge);
    }
  }
}

function updateEdgesStyle(edges,edgeIds, cb){
  if(edgeIds){
    edges.forEach(edge => {
      if(edgeIds.has(edge.id)){
        cb(edge);
      }
    })
  }else{
    edges.forEach(edge => {
      cb(edge);
    })
  }
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