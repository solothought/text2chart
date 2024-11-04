import parse from "@solothought/text2obj/flow";
import { nodeSize } from './config.js';

const nodeWidth = nodeSize.width;
const nodeHeight = nodeSize.height;
const nodeMargin_h = nodeSize.height*1.5;
const nodeMargin_v = nodeSize.width*1.1;

function SvelteFlowNode(id, data , position){ //TODO: use class
  return {
    id : id+"",
    type : "step",
    data : data,
    position : position,
  }
}
function SvelteFlowEdge(sourceId, targetId, i, sourceType="", targetType){ //TODO: use class
  // console.debug(sourceType, i)
  let animated = false;
  let srcHandle = "b";
  let label = "";
  if(isBranchStep(sourceType)){//first node
    if(i==0)  srcHandle = "r";
  }
  // if(targetType === "LOOP" && sourceId > targetId){
  if(sourceId > targetId){
    srcHandle = "l";
    animated = true;
  }
  if(sourceType === "IF" || sourceType === "ELSE_IF"){
    if(i === 0)    label= "True";
    else if(i === 1)    label= "False";
  }else if(sourceType === "LOOP"){
    if(i === 1)    label= "Exit";
  }
  return {
    id : `${sourceId}-${targetId}`,
    source : sourceId+"",
    target : targetId+"",
    label : "",
    data : {},
    sourceHandle: srcHandle,
    animated: animated,
    label: label
  }
}

/**
 * Parse flow to SvelteFlow compatible nodes and edges
 * @param {string} flowContent 
 * @returns 
 */
export function convert(flowContent){
  const nodesAndEdges = [];
  try{
    const flows = parse(flowContent); // returns [Flow]
    for (let i = 0; i < flows.length; i++) {
      const flow = flows[i];
      if(flow.steps.length > 0) {
        const nAe = mapStepsToNodes(flow);
        // console.log(nAe.edges);
        // console.log(nAe.nodes);
        nodesAndEdges.push(nAe);
      }
    }
  }catch(e){
    //TODO: notify error
    console.error(e);
  }
  // console.debug(nodesAndEdges);
  return nodesAndEdges;
}


function mapStepsToNodes(flow){
  const nodes=[];
  const edges=[];
  let i = 0, rows=0;
  for (; i < flow.steps.length; i++) {
    const step = flow.steps[i];

    if(flow.links[i]){
      //Add node
      const nodeId = i;
      const node = SvelteFlowNode(nodeId, { 
        msg: step.rawMsg, 
        type: step.type, 
        }, nodePosition(i,flow.leveledSteps) )
      nodes.push(node);

      //Add edge
      for (let j = 0; j < flow.links[i].length; j++) {
        const targetId = flow.links[i][j];
        if(targetId === -1){
          node.data.isEnd = true;          
        }else{
          if(!flow.links[targetId]) throw new Error(`Link for Step ${targetId} is not present`);
          const edge = SvelteFlowEdge(nodeId, targetId, j, step.type, flow.steps[targetId].type);
          edges.push(edge);
        }
      }
    }
  }
  // for first node
  nodes[0].data.isStart = true;
  // console.debug(nodes);
  return {flowName:  flow.name, nodes, edges}
}

function nodePosition(stepId, indentations){
  for (let i = 0; i < indentations.length; i++) {
    if(indentations[i].includes(stepId)){
      return { 
        x: (nodeWidth + nodeMargin_v) * i, // Default position if undefined
        y: (nodeHeight + nodeMargin_h) * stepId 
      };
    }
  }
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