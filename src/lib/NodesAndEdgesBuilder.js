
import { Position } from "@xyflow/svelte";
import Slimo from "slimo";

const nodeWidth = 150;
const nodeHeight = 50;
const nodeMargin_h = 80;
const nodeMargin_v = 150;

function SvelteFlowNode(id, data , position){
  return {
    id : id+"",
    type : "step",
    data : data,
    position : position,
    // position : {x:0,y:0},
  }
}
function SvelteFlowEdge(sourceId, targetId, i, targetType){
  // console.debug(targetType)
  let animated = false;
  let srcHandle = "b";
  if(i!==0){//first node
    srcHandle = "r"
  }
  // if(targetType === "LOOP" && sourceId > targetId){
  if(sourceId > targetId){
    srcHandle = "l";
    animated = true;
  }
  return {
    id : `${sourceId}-${targetId}`,
    source : sourceId+"",
    target : targetId+"",
    label : "",
    data : {},
    sourceHandle: srcHandle,
    animated: animated
  }
}

export function convert(slimoContent){
  const flows = Slimo.parse(slimoContent);
  const flowNames = Object.keys(flows);
  if(flowNames.length > 0){

    const flowToChart = flows[flowNames[0]][0];
    return _convert(flowToChart);
  }
}


function _convert(flowToChart){
  const nodes = [];
  const edges = [];
  const cache = [];

  /**
   * 
   * @param {any[]} steps 
   * @param {obj} parentNode 
   * @param {number} row 
   * @param {number} col 
   */
  function mapStepsToNodes(steps, parentNode, row, col){
    if(steps.length === 0 
      || steps.indexOf(null) !== -1 
      || ( isBranchStep(parentNode.data.type) && steps.length === 1)){
        // console.debug(parentNode.data.msg);
      // TODO: 
      //if(flowToChart.exitSteps[parentNode.id]){ 
        //edge to end node
      //}
        // console.debug(flowToChart.exitSteps[parentNode.id]);
      parentNode.data.isEnd = true; 
    }
  
    steps.forEach((step, i) => {
      if(i === 0) {
        row++;
      }else{
        row++; col++;
      };
      // const step =  flow.index[index];
      if(step !== null){
        const nodeId = step.index + 1;
        if( cache.indexOf(step.index) === -1){
          cache.push(step.index); // Avoid duplicating nodes
          // Create new node
          const node = SvelteFlowNode(nodeId, { 
            msg: step.rawMsg, 
            type: step.type, 
          }, calculatePosition(row, col, i) );

          nodes.push(node); // Add the node to the nodes array

          // Add edge from parent to this node
          // edges.push(SvelteFlowEdge(parentNode.data.id, nodeId));
          if (parentNode && parentNode.id) {
            edges.push(SvelteFlowEdge(parentNode.id, nodeId, i, flowToChart.index[step.index].type ));
          }

          // Recursively process child steps
          mapStepsToNodes(step.nextStep, node, row, col);
        }else{ //loop
          // edges.push(SvelteFlowEdge(parentNode.data.id, nodeId));
          if (parentNode && parentNode.id) {
            edges.push(SvelteFlowEdge(parentNode.id, nodeId, i, flowToChart.index[step.index].type) );
          }
        }
      }
    });
  }

  const step = flowToChart.steps[0]; //at root, there is one step only
  const node = SvelteFlowNode(step.index + 1, { 
    msg: step.rawMsg, 
    type: step.type, 
    isStart: true
    }, calculatePosition(1,1,0) )
  nodes.push(node);
  mapStepsToNodes(step.nextStep, node, 1, 1)
  
  return {nodes, edges};
}

function calculatePosition(row, col, i) {
  return { 
    x: (nodeWidth + nodeMargin_v) * col, // Default position if undefined
    y: (nodeHeight + nodeMargin_h) * row 
  };
}


const branchSteps=["IF", "ELSE_IF", "LOOP"];
function isBranchStep(type){
  return branchSteps.indexOf(type) !== -1;
}

// const flowText = `
// FLOW: passed as parameter
// here you go
// LOOP until
//   you're safe here
//   IF not
//     STOP
//   ELSE
//     SKIP
// ` 

// const {nodes,edges} = convert(flowText)
// console.log(nodes)
// console.log(edges);