
import Slimo from "slimo";

const nodeWidth = 100;
const nodeHeight = 50;
const nodeMargin_h = 50;
const nodeMargin_v = 50;

function SvelteFlowNode(id, data , position){
  return {
    id : id+"",
    type : "step",
    data : data,
    position : position,
  }
}
function SvelteFlowEdge(source, target){
  return {
    id : `${source}-${target}`,
    source : source+"",
    target : target+"",
    label : "",
    data : {},
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
   * @param {Step[]} steps 
   * @param {obj} parentNode 
   * @param {number} row 
   * @param {number} col 
   */
  function mapStepsToNodes(steps, parentNode, row, col){
    if(steps.length === 0 
      || steps.indexOf(null) !== -1 
      || ( isBranchStep(parentNode.data.type) && steps.length === 1)){
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
          }, calculatePosition(row, col) );

          nodes.push(node); // Add the node to the nodes array

          // Add edge from parent to this node
          // edges.push(SvelteFlowEdge(parentNode.data.id, nodeId));
          if (parentNode && parentNode.id) {
            edges.push(SvelteFlowEdge(parentNode.id, nodeId));
          }

          // Recursively process child steps
          mapStepsToNodes(step.nextStep, node, row, col);
        }else{ //loop
          // edges.push(SvelteFlowEdge(parentNode.data.id, nodeId));
          if (parentNode && parentNode.id) {
            edges.push(SvelteFlowEdge(parentNode.id, nodeId));
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
    }, {x:nodeMargin_h, y:nodeMargin_v} )
  nodes.push(node);
  mapStepsToNodes(step.nextStep, node, 1, 1)

  return {nodes, edges};
}

// function calculatePosition(row, col){
//   return { x: (nodeHeight + nodeMargin_v)*row,
//            y: (nodeWidth + nodeMargin_h)*col}
// }
function calculatePosition(row, col) {
  return { 
    x: (nodeHeight + nodeMargin_v) * col, // Default position if undefined
    y: (nodeWidth + nodeMargin_h) * row 
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