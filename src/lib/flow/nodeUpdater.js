/**
 * update a property or state of all or selected nodes
 * @param {object[]} nodes 
 * @param {object} globalState 
 * @param {object} newProp 
 * @param {string[]} selectedNodeIds node ids
 */
export function updateProperty(nodes, globalState, newProp = {}, selectedNodeIds = null){
  if(!selectedNodeIds){
    nodes.forEach(node => {
        node.data = {
          ...node.data,
          ...globalState,
          ...newProp
        };
    })
  }else{
    nodes.forEach(node => {
      if(selectedNodeIds.has(node.id)){
        node.data = {
          ...node.data,
          ...globalState,
          ...newProp
        };
      }
    })
  }
  return nodes; //for chaining if needed
}

export function updatePropertyByIndexes(nodes, globalState, newProp = {}, selectedNodeIndexes = []){
  selectedNodeIndexes.forEach(index => {
    nodes[index].data = {
      ...nodes[index].data,
      ...globalState,
      ...newProp
    }
  });
}

