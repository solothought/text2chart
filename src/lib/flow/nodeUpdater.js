/**
 * update a property or state of all or selected nodes
 * @param {object[]} nodes 
 * @param {object} globalState 
 * @param {object} newProp 
 * @param {string[]} selectedNodes node ids
 */
export function updateProperty(nodes, globalState, newProp = {}, selectedNodes = null){
  nodes.forEach(node => {
    if(!selectedNodes || selectedNodes.has(node.id)){
      node.data = {
        ...node.data,
        ...globalState,
        ...newProp
      };
    }
  })
  return nodes; //for chaining if needed
}