import parse from "@solothought/text2obj/flow";
import { nodeSize } from './../config.js';

const nodeWidth = nodeSize.width;
const nodeHeight = nodeSize.height;
const nodeMargin_h = nodeSize.height*1.5;
const nodeMargin_v = nodeSize.width*1.1;

const deltaX = nodeWidth + nodeMargin_v;
const deltaY = nodeHeight + nodeMargin_h;

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
  // let srcHandle = "b";
  // let targetHandle = "t";
  let srcHandle = "";
  let targetHandle = "";
  let label = "";
  if(isBranchStep(sourceType)){//first node
    if(i==0)  {
      srcHandle = "r";
      targetHandle= "lt";
    }
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
    data : {},
    sourceHandle: srcHandle,
    targetHandle: targetHandle,
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
        // console.log(nAe.paths);
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
  // const connections = {}; // { "node-id": {target: ["node-id"], parent: ["node-id"]} }
  let lastNode;
  const parentStack = [];
  let nodeId = 0, row=-1;
  const nodeIdToIndexMap = {};
  let decisionPoints = 0;

  for (; nodeId < flow.steps.length; nodeId++) {
    const step = flow.steps[nodeId];
    
    if(flow.links[nodeId]){
      row++;
      let position;

      //Build chart connections
      // if(connections[nodeId]) connections[nodeId].target = [...flow.links[nodeId].map(String)];
      // else connections[nodeId] = {target: [...flow.links[nodeId].map(String)], parent: []};
    
      //calculate position
      if(!lastNode) position={x:0,y:0};
      else{
        const lastStep = flow.steps[lastNode.id];
        if(lastStep.indent === step.indent) {//same level
          position = {x:lastNode.position.x, y:lastNode.position.y+deltaY}
        }else if(lastStep.indent < step.indent){ //child-parent step
          row--; //graph expands horizontally
          position = {x:lastNode.position.x+deltaX, y:lastNode.position.y};
        }else{
          let diff = lastStep.indent - step.indent;
          let parentNode;
          while(diff-->0) parentNode = parentStack.pop();
          position = {x:parentNode.position.x, y:(row*deltaY)}
        }

        if(flow.steps[nodeId-1].type==="ELSE"){ //shift to left
          position = {x:position.x-deltaX, y:position.y};
        }
      }

      //Add node
      const node = SvelteFlowNode(nodeId, { 
          msg: step.msg, 
          rawMsg: step.rawMsg, 
          type: step.type, 
          indent: step.indent
        }, position )
      if(isBranchStep(step.type)) {
        decisionPoints++;
        node.data.collapsable = true;
      }else if(step.type === "GOTO"){
        decisionPoints++;
      }
      nodes.push(node);
      node.data.index = nodes.length - 1;
      nodeIdToIndexMap[nodeId] = nodes.length - 1;

      //to calculate position
      lastNode = node;
      if(isBranchStep(step.type)){
        parentStack.push(node);
      }

      //Add edge
      for (let j = 0; j < flow.links[nodeId].length; j++) {
        const targetId = flow.links[nodeId][j];
        
        //Build chart connections
        // if(!connections[targetId]) connections[targetId] = {target:[], parent:[]}
        // if(targetId > nodeId) connections[targetId].parent.push(String(nodeId));

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
  let paths = findAllPaths(flow.links, nodeIdToIndexMap);
  paths = paths.sort((p1,p2) => p1.length  - p2.length);

  const stats = {};
  stats.cyclomaticComplexity = decisionPoints + 1;
  stats.depth = flow.leveledSteps.length;
  stats.stepsCount = flow.steps.length;
  stats.decisionPoints = decisionPoints;
  stats.nestingLoops = calculateLoopNestingIndices(flow.steps);

  return {flowName:  flow.name, nodes, edges, paths, nodesIndex: nodeIdToIndexMap, stats}
}

/**
 * 
 * @param {[]} steps 
 * @returns {[number[]]}
 */
function calculateLoopNestingIndices(steps) {
  // Initialize variables
  const loopNestingIndices = [];
  let currentNestingLevel = 0;

  // Traverse the steps array
  steps.forEach((step, index) => {
    if (step.type === "LOOP") {
      // Increment the nesting level for this loop
      currentNestingLevel++;

      // Ensure there's an array for this nesting level
      if (!loopNestingIndices[currentNestingLevel - 1]) {
        loopNestingIndices[currentNestingLevel - 1] = [];
      }

      // Add the step index to the corresponding nesting level
      loopNestingIndices[currentNestingLevel - 1].push(index);
    } else if (step.type === "END") {
      // Decrement the nesting level when exiting a loop
      currentNestingLevel--;
    }
  });

  return loopNestingIndices;
}

function findAllPaths(links,nodeIdToIndexMap) {
  const paths = [];

  function dfs(nodeId, currentPath, visitCount) {
    const nodeIndex = nodeIdToIndexMap[nodeId];
    currentPath.push(String(nodeIndex));

    if (nodeId === -1) {
        paths.push([...currentPath.slice(0, -1)]); // Exclude -1 from final path
    } else {
        for (const neighbor of links[nodeId] || []) {
            if (visitCount[neighbor] === undefined) visitCount[neighbor] = 0;

            if (visitCount[neighbor] < 2 || neighbor === -1) { // Allow limited revisits
                visitCount[neighbor]++;
                dfs(neighbor, currentPath, { ...visitCount }); // Pass a copy to avoid mutation issues
                visitCount[neighbor]--;
            }
        }
    }

    currentPath.pop(); // Backtrack
  }

  dfs(0, [], { 0: 1 }); // Start DFS with node 0 marked as visited once
  
  return paths;
}


const branchSteps=["IF", "ELSE_IF", "LOOP"];
function isBranchStep(type){
  return branchSteps.indexOf(type) !== -1;
}

// let flowText = `
// FLOW: passed as parameter
// here you go
// LOOP until
//   you're safe here
//   IF not
//     STOP
//   ELSE
//     SKIP
// ` 
// let flowText = `
// FLOW: Sample flow 1
// LOOP (source is) readable
//   read a character (of input buffer)
//   IF statement 
//     IF another statement
//       THEN found here
//       AND copy data
//     ELSE_IF parallel statement
//       DO nothing
//       ERR Unexpected end of input
//       END
//     ELSE 
//       last statement
//   ELSE 
//     something
//   IF optional
//     still step
// DO in end
// ` 

// const {nodes,edges} = convert(flowText)
// console.log(nodes)
// console.log(edges);


// const steps = [
//   { msg: "outer loop", type: "LOOP", indent: 0 },
//   { msg: "inner loop", type: "LOOP", indent: 1 },
//   { msg: "", type: "END", indent: 1 },
//   { msg: "innermost loop", type: "LOOP", indent: 2 },
//   { msg: "", type: "END", indent: 2 },
//   { msg: "", type: "END", indent: 0 }
// ];
// console.log(calculateLoopNestingIndices(steps));