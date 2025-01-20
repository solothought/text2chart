<script>
  import DownloadButton from './DownloadButton.svelte'; // Your existing download button component

  // Props
  export let flowsData = []; // List of flows (e.g., [{ flowName: 'Flow 1' }, { flowName: 'Flow 2' }])
  export let selectedFlowIndex = 0; // Index of the selected flow
  export let disableTools = []; // List of disabled tools (e.g., ['flow-selector', 'save-chart'])
  export let showDetails = false; // Toggle for detail/summary view

  // Handle flow change
  function handleFlowChange(event) {
    const index = event.target.value;
    selectedFlowIndex = index;
  }

  // Handle toggle details
  function handleToggleDetails() {
    showDetails = !showDetails;
  }
</script>

<div class="toolbar">
  <!-- Flow Selector -->
  {#if !disableTools.includes('flow-selector')}
    <select class="st-flow-chart-tool" on:change={handleFlowChange} bind:value={selectedFlowIndex}>
      {#each flowsData as flow, index}
        <option value={index}>{flow.flowName}</option>
      {/each}
    </select>
  {/if}

  <!-- Toggle Details Button -->
  {#if !disableTools.includes('toggle-details')}
    <button class="st-flow-chart-tool" on:click={handleToggleDetails}>
      {showDetails ? 'Summary' : 'Details'}
    </button>
  {/if}

  <!-- Save Chart as Image Button -->
  {#if !disableTools.includes('save-chart')}
    <DownloadButton nodes={$nodes} fileName={flowsData[selectedFlowIndex]?.flowName || 'chart'} />
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .st-flow-chart-tool {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
  }

  .st-flow-chart-tool:hover {
    border-color: #ff3e00;
    background: #fff0e6;
  }
</style>