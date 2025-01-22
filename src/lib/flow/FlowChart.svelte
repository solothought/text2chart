<script>
  import Toolbar from './Toolbar.svelte';
  import CoreChart from './CoreChart.svelte';
  import { convert as flowText2Obj } from './NodesAndEdgesBuilder.js';
  import { updateProperty } from './nodeUpdater.js';

  export let text = "";
  export let selection = [];

  export let flowsData = []; //json obj of flows text
  let selectedFlowIndex = 0; //toolbar

  let nodes = [];
  let edges = [];
  let connections = {};
  let flowName = "";
  let nodeState = {
    hideMsgDetail: false,
    standardShape: false
  };

  // Bind to CoreChart instance
  let coreChartInstance;

  // Update flow data when text changes or flows data
  $: {
    if (flowsData.length > 0) {
      updateSelectedFlow(selectedFlowIndex);
    }else if (text.length > 0) { //called only when text is updated
      flowsData = flowText2Obj(text);
      updateSelectedFlow(selectedFlowIndex);
    }
  }

  /**
   * Draw chart for the given flow index
   * @param index
   */
  function updateSelectedFlow(index) {
    selectedFlowIndex = index;
    if (flowsData[selectedFlowIndex]) {
      console.log(selectedFlowIndex);
      const selectedFlow = flowsData[selectedFlowIndex];
      nodes = selectedFlow.nodes;
      edges = selectedFlow.edges;
      connections = selectedFlow.connections;
      flowName = selectedFlow.flowName;
      updateProperty(nodes, nodeState);
      
      if (coreChartInstance && typeof coreChartInstance.updateStore === 'function') {
        coreChartInstance.updateStore(nodes, edges);
      }
    }
  }

  // Handle flow change from toolbar
  function handleFlowChange(event) {
    selection = [];
    updateSelectedFlow(parseInt(event.target.value));
  }

  function flowChange(e){//triggered by core chart
    if(e.detail.flowName){ //When User clicks on a node
      const flowName = e.detail.flowName;
      flowsData.forEach((flow, i) => {
        if (flow.flowName === flowName) {
          updateSelectedFlow(i);
        }
      });
    }
  }

  // Toggle node message details
  function hideNodeMsgDetail() {
    nodeState.hideMsgDetail = !nodeState.hideMsgDetail;
    updateProperty(nodes, nodeState);
    coreChartInstance.updateStore(nodes, edges);
  }

  $: {
    if (selection && selection.nodeIds && selection.nodeIds.length) {
      console.debug("update selection")
      if(selection.flowIndex !== selectedFlowIndex){
        updateSelectedFlow(selection.flowIndex);
      }
    }
  }
</script>

<div class="solothought_text2chart_flow">
  <Toolbar
    {flowsData}
    bind:selectedFlowIndex
    {flowName}
    {nodeState}
    {nodes}
    handleFlowChange={handleFlowChange}
    hideNodeMsgDetail={hideNodeMsgDetail}
  />
  <CoreChart
    bind:this={coreChartInstance}
    {nodes}
    {edges}
    {nodeState}
    {connections}
    {...$$restProps}
    {selection}
    on:flowChange={flowChange}
  />
</div>