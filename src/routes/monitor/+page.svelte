<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  //Icons
  import BranchIcon from '$lib/icons/branch.svelte';
  import LogsIcon from '$lib/icons/logs.svelte';
  //Components
  import FlowList from '$lib/view/FlowList.svelte';
  import TextArea from '$lib/view/TextArea.svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import ChartsDashboard from '$lib/monitor/ChartsDashboard.svelte';
  import DetailLogs from '$lib/monitor/RawLogs.svelte';
  import FlowLogs from '$lib/monitor/FlowLogs.svelte';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([]);
  let selectedFlow;
  let selectedFlowName = "";
  let nodesToHighlight = [];
  const flowsText = [];
  let flowText = '';
  let chartKey = 0; // Used to reinitialize the FlowChart component
  const mode = "monitor";
  let searchQuery = "";
  let searchFlowQuery = "";

  let stepsExecutionTimes = writable([]);

  // New store to track the selected view
  let selectedView = writable('FlowChart');

  const host = 'http://localhost:7777';

  // Fetch the list of flows
  async function fetchFlows() {
    try {
      const response = await fetch(`${host}/flows`);
      const data = await response.json();
      flows.set(data); // Set store with fetched data
      return data;
    } catch (error) {
      console.error("Error fetching flows:", error);
    }
  }

  // Fetch execution time data for the selected flow
  async function fetchStepsStats(flowName) {
    try {
      const encodedFlowName = encodeURIComponent(flowName);
      const response = await fetch(`${host}/flows/Order Service/${encodedFlowName}/steps`);
      if (response.ok) {
        const data = await response.json();
        stepsExecutionTimes.set(data); // Set store with fetched execution time data
      } else {
        console.error("Error fetching execution times:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching execution times:", error);
    }
  }

  setInterval(async ()=>{
    fetchFlows();
  }, 30000)



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
    // selectedAppName = 
    selectedFlow = event.detail.flow;
    const flowName = event.detail.flowName;
    if(!flowsText[flowName]){
      flowsText[flowName] = await fetchFlowContent(flowName) || '';
    }
    flowText = flowsText[flowName];
    selectedFlowName = flowName;

    // Fetch execution times for the selected flow
    fetchStepsStats(flowName);
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

      // Set interval to fetch execution times every 5 seconds
      setInterval(() => {
        if (selectedFlowName) {
          fetchStepsStats(selectedFlowName);
        }
      }, 10000);
    }
  });

  // Handle line selection from the TextArea component
  function handleLineSelection(event) {
    nodesToHighlight = event.detail.selectedLines;
  }

  // Handle view change
  function changeView(event) {
    selectedView.set(event.target.value);
  }

  function showLogs(query){
    searchQuery = query;
    selectedView.set("DetailLogs");
  }
  
  function showFlowLogs(query){
    searchFlowQuery = query;
    selectedView.set("FlowLogs");
  }

  $: selectedFlow = $flows.find(flow => flow.name === selectedFlowName);
</script>

<style>
  .workspace {
    margin-top:80px;
    height: calc(100vh - 100px);
  }
  .app-flow-toolbar{
    height: 60px;
  }
  .flow-stats {
    width: 400px;
    display: flex;
    padding: 5px 2px;
  }

  .flow-stats .info {
    flex: 1;
    text-align: center;
  }

  #view-selector {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    height: 50px;
  }
</style>

<div class="container-fluid">
  <div class="workspace">
    <div class="row app-flow-toolbar">
      <div class="col-4">
        <FlowList
          {flows}
          {selectedFlowName}
          on:flowSelected={handleFlowSelection}
          {mode}
          />
      </div>
      <div class="col-3">
        {#if mode === "monitor"}
        <div class="flow-stats">
          <span class="info" style="cursor:pointer;" on:click={(e) => showFlowLogs("STATUS=0")} ><strong>❌</strong>: {100 - (selectedFlow?.successPercentage || 0)}%</span>
          <span class="info" style="cursor:pointer;" on:click={(e) => showLogs("TYPE=ERROR")} ><strong>🪳</strong>: {selectedFlow?.errors || 0}</span>
          <span class="info"><strong>⏱</strong>: {selectedFlow?.avgExecutionTime || 0}ms</span>
          <span class="info" style="cursor:pointer;" on:click={(e) => showFlowLogs("SLOW")} ><strong style="color:red; cursor:pointer;">⏱!</strong>: {selectedFlow?.maxExecutionTime || 0}ms</span>
        </div>
        {/if}
      </div>
      <div class="col-5">
        <select id="view-selector" on:change={changeView}>
          <option value="FlowChart" selected={$selectedView === "FlowChart"}>Flow chart</option>
          <option value="FlowLogs" selected={$selectedView === "FlowLogs"}>Flow Logs</option>
          <option value="DetailLogs" selected={$selectedView === "DetailLogs"}>Detail Logs</option>
          <option value="ChartsDashboard">Chart Dashboard</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <TextArea
          bind:text={flowText}
          on:lineSelection={handleLineSelection}
          {stepsExecutionTimes}
          {mode}
        />
      </div>
      <div class="col-8">
        {#if $selectedView === 'FlowChart'}
          {#key chartKey}
            <FlowChart 
              style="padding-left:10px; height:calc(100vh - 180px); width:65vw" 
              bind:text={flowText} 
              bind:selection={nodesToHighlight}/>
          {/key}
        {:else if $selectedView === 'DetailLogs'}
          <DetailLogs {searchQuery} {selectedFlowName} appName="" />
        {:else if $selectedView === 'FlowLogs'}
          <FlowLogs {searchFlowQuery} {selectedFlowName} appName="" />
        {:else if $selectedView === 'ChartsDashboard'}
          <ChartsDashboard {selectedFlowName} appName="sample-app" />
        {/if}
      </div>
    </div>
  </div>
</div>