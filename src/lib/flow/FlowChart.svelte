<script>
  import Toolbar from './Toolbar.svelte';
  import CoreChart from './CoreChart.svelte';
  import { convert as flowText2Obj } from './NodesAndEdgesBuilder.js';
  import { updateProperty } from './nodeUpdater.js';

  export let text = "";
  export let selection = {};
  export let focusOn = true;
  export let width = '100%';
  export let height = '100%';
  export let flowsData = []; //json obj of flows text
  export let minimap = true;
  export let toolbar = true;
  let coreChartHeight = "";
  
  if (toolbar) coreChartHeight = `calc(${height} - 50px)`;
  else coreChartHeight = height;

  let selectedFlowIndex = 0; //toolbar
  let nodes = [];
  let edges = [];
  let paths = [];
  let nodesIndex = {};
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
      nodesIndex = selectedFlow.nodesIndex;
      flowName = selectedFlow.flowName;
      selection = { flowIndex: index, nodesIndex};
      updateProperty(nodes, nodeState);
      if (coreChartInstance && typeof coreChartInstance.updateStore === 'function') {
        coreChartInstance.updateStore(nodes, edges);
      }
    }
  }

  // Handle flow change from toolbar
  function handleFlowChange(event) {
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
  function hideStepMsgDetail() {
    nodeState.hideMsgDetail = !nodeState.hideMsgDetail;
    updateProperty(nodes, {hideMsgDetail: nodeState.hideMsgDetail});
    coreChartInstance.updateStore(nodes, edges);
  }

    // Handle path selection from toolbar
  function selectPath(event) {
    // console.log(event);
    if(event.detail.mode === "play"){
      playPath(event);
    }else{
      selection = {
        flowIndex: event.detail.flowIndex,
        nodeIndexes: event.detail.nodeIndexes
      };
    }
  }

  function playPath(event) {
    const flowIndex = event.detail.flowIndex;
    const path = event.detail.nodeIndexes;

    //TODO: highlight edge between 2 nodes
    function highlightNextNode(index) {
      if (index < path.length) {
        const nextIndex = path[index];
        selection = {
          flowIndex: flowIndex,
          nodeIndexes: [nextIndex]
        };
        
        setTimeout(() => {
          highlightNextNode(index + 1);
        }, 400); // 400ms delay
      } else {
        // Reset selection after playing the entire path
        selection = { flowIndex: -1, nodeIndexes: [] };
      }
    }

    // Start highlighting the first node
    highlightNextNode(0);
  }

  $: {
    if (selection && selection.nodeIds && selection.nodeIds.length) {
      if(selection.flowIndex !== selectedFlowIndex){
        updateSelectedFlow(selection.flowIndex);
      }
    }
  }
</script>

<div class="solothought_text2chart_flow" style="width: {width}; height: {height};">
  {#if toolbar}
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
  {/if}
  <CoreChart
    bind:this={coreChartInstance}
    {nodes}
    {edges}
    {nodeState}
    {paths}
    {nodesIndex}
    {selectedFlowIndex}
    {...$$restProps}
    bind:selection={selection}
    {focusOn}
    {minimap}
    style="width: {width}; height: {coreChartHeight};"
    on:flowChange={flowChange}
  />

  
</div>
<style>
  /* :global(.svelte-flow__attribution){
    display: none;
  } */
</style>