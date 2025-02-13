<script>
  import FlowList from '$lib/view/FlowList.svelte';
  import TextArea from '$lib/view/TextArea.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlowChart from '$lib/flow/FlowChart.svelte';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([]);
  let selectedFlowName = "";
  let nodesToHighlight = [];
  const flowsText = [];
  let flowText = '';
  let chartKey = 0; // Used to reinitialize the FlowChart component
  const mode = "monitor";

  const host = 'http://localhost:3000';

  // Fetch the list of flows
  async function fetchFlows() {
    try {
      const response = await fetch(`${host}/flows/sample-app`);
      const data = await response.json();
      flows.set(data); // Set store with fetched data
      return data;
    } catch (error) {
      console.error("Error fetching flows:", error);
    }
  }

  setInterval(async ()=>{
    fetchFlows();
  }, 2000)

  // Fetch content for a selected flow
  async function fetchFlowContent(flowName) {
    try {
      // selectedFlowName = flowName;
      const encodedFlowName = encodeURIComponent(flowName); // Handle spaces in URLs
      const response = await fetch(`${host}/flows/sample-app/${encodedFlowName}`);
      if (response.ok) {
        return await response.text();
      } else {
        return "Error: Flow not found.";
      }
    } catch (error) {
      console.error("Error fetching flow content:", error);
    }
  }

  /**
   * Load text from browser storage or from memory
   * @param event
   */
  async function handleFlowSelection(event) {
    const flowName = event.detail.flowName;
    if(!flowsText[flowName]){
      flowsText[flowName] = await fetchFlowContent(flowName) || '';
    }
    flowText = flowsText[flowName];
    selectedFlowName = flowName;
    // chartKey++;
  }

  /**
   * Load flows from browser storage if present
  */
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const data = await fetchFlows();
      if (data.length > 0) {// Select the first flow automatically
        handleFlowSelection({ detail: { flowName: data[0].name } });
      }
    }
  });

  // Handle line selection from the TextArea component
  function handleLineSelection(event) {
    nodesToHighlight = event.detail.selectedLines;
  }

  
</script>

<style>
  .workspace {
    margin-top:80px;
    display: flex;
    height: calc(100vh - 100px);
  }
  .left-panel{width: 30vw; height: 100%; border-right: 1px dashed black;}
</style>
<div class="container-fluid">
  <div class="workspace">
    <div class="left-panel">
      <FlowList
        {flows}
        {selectedFlowName}
        on:flowSelected={handleFlowSelection}
        {mode}
      />
      <TextArea
        bind:text={flowText}
        on:lineSelection={handleLineSelection}
      />
    </div>
    {#key chartKey} <!-- Recreate Chart component -->
    <FlowChart 
      style="padding-left:10px; width:65vw; height:100%" 
      bind:text={flowText} 
      bind:selection={nodesToHighlight}/>
    {/key}
  </div>
</div>