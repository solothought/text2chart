<script>
  import Toolbar from './Toolbar.svelte';
  import CoreChart from './CoreChart.svelte';
  import { convert as flowText2Obj } from './NodesAndEdgesBuilder.js';
  import { updateProperty } from './nodeUpdater.js';

  export let text = "";
  export let selection = [];
  export let focusOn = true;

  export let flowsData = []; //json obj of flows text
  let selectedFlowIndex = 0; //toolbar

  let nodes = [];
  let edges = [];
  let paths = [];
  let flowName = "";
  let nodeState = {
    hideMsgDetail: false,
    standardShape: false
  };

  // Bind to CoreChart instance
  let coreChartInstance;

  // Update flow data when text changes or flows data
  $: {
    if (text.length > 0) { //called only when text is updated
      flowsData = flowText2Obj(text);
      updateSelectedFlow(selectedFlowIndex);
    }
  }
  $: {
    if (flowsData.length > 0) {
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
      const selectedFlow = flowsData[selectedFlowIndex];
      nodes = selectedFlow.nodes;
      edges = selectedFlow.edges;
      paths = selectedFlow.paths;
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
          selection = [];
          updateSelectedFlow(i);
        }
      });
    }
  }

  // Toggle node message details
  function hideStepMsgDetail() {
    nodeState.hideMsgDetail = !nodeState.hideMsgDetail;
    updateProperty(nodes, {hideMsgDetail: nodeState.hideMsgDetail});
    coreChartInstance.updateStore(nodes, edges);
  }

    // Handle path selection from toolbar
  function selectPath(event) {
    selection = {
      flowIndex: event.detail.flowIndex,
      nodeIndexes: event.detail.nodeIndexes
    };
  }


  $: {
    if (selection && selection.nodeIds && selection.nodeIds.length) {
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
    bind:hideMsgDetail={nodeState.hideMsgDetail}
    {nodes}
    handleFlowChange={handleFlowChange}
    hideStepMsgDetail={hideStepMsgDetail}
    on:pathSelected={selectPath}
    bind:focusOn
  />
  <CoreChart
    bind:this={coreChartInstance}
    {nodes}
    {edges}
    {nodeState}
    {paths}
    {...$$restProps}
    {selection}
    {focusOn}
    on:flowChange={flowChange}
  />
</div>