<script>
  import { onMount } from 'svelte';
  import Toolbar from './Toolbar.svelte';
  import CoreChart from './CoreChart.svelte';
  import { convert as flowText2Obj } from './NodesAndEdgesBuilder.js';
  import { updateProperty } from './nodeUpdater.js';

  export let text = "";
  export let selection = [];

  let flowsData = []; //json obj of flows text
  let selectedFlowIndex = 0; //toolbar

  let nodes = [];
  let edges = [];
  let connections = {};
  let flowName = "";
  let nodeConfig = {
    hideMsgDetail: false,
    standardShape: false
  };

  // Update flow data when text changes
  $: {
    if (text.length > 0) {
      flowsData = flowText2Obj(text);
      updateSelectedFlow(selectedFlowIndex);
    }
  }

  // Update selected flow
  function updateSelectedFlow(index) {
    selectedFlowIndex = index;
    if (flowsData[selectedFlowIndex]) {
      const selectedFlow = flowsData[selectedFlowIndex];
      nodes = selectedFlow.nodes;
      edges = selectedFlow.edges;
      connections = selectedFlow.connections;
      flowName = selectedFlow.flowName;
      updateProperty(nodes, nodeConfig);
    }
  }

  // Handle flow change from toolbar
  function handleFlowChange(event) {
    updateSelectedFlow(parseInt(event.target.value));
  }

  function flowChange(e){//triggered by core chart

    if(e.detail.flowName){
      const flowName = e.detail.flowName;
      flowsData.forEach((flow, i) => {
        if (flow.flowName === flowName) {
          updateSelectedFlow(i);
        }
      });
      
    }else if(e.detail.flowIndex){
      const flowIndex = e.detail.flowIndex;
      if(flowIndex !== selectedFlowIndex){
        updateSelectedFlow(flowIndex);
      }
    }
  }

  // Toggle node message details
  function hideNodeMsgDetail() {
    nodeConfig.hideMsgDetail = !nodeConfig.hideMsgDetail;
    updateProperty(nodes, nodeConfig);
  }

  onMount(() => {
    console.debug("FlowChart mounted");
  });
</script>

<div class="solothought_text2chart_flow">
  <Toolbar
    {flowsData}
    bind:selectedFlowIndex
    {flowName}
    {nodeConfig}
    {nodes}
    handleFlowChange={handleFlowChange}
    hideNodeMsgDetail={hideNodeMsgDetail}
  />
  <CoreChart
    {nodes}
    {edges}
    {nodeConfig}
    {connections}
    {...$$restProps}
    {selection}
    on:flowChange={flowChange}
  />
</div>