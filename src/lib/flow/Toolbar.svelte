<script>
  import DownloadButton from './../DownloadButton.svelte';
  import PathsDropdown from './PathsDropdown.svelte';

  export let flowsData = [];
  export let selectedFlowIndex;
  export let flowName = "";
  export let nodeState = {};
  export let nodes = [];
  export let handleFlowChange;
  export let hideNodeMsgDetail;
  
  // Dispatch function to emit custom events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Function to handle path selection from PathsDropdown
  function handlePathSelect(event) {
    // dispatch('pathSelected', event.detail);
    const { flowIndex, nodeIds } = event.detail;
    // Emit the selection to FlowChart
    dispatch('selectionChange', {
      flowIndex: flowIndex,
      nodeIds: nodeIds
    });
  }
  
</script>

<div class="st-toolbox">
  <select class="st-flow-chart-tool" on:change={handleFlowChange} bind:value={selectedFlowIndex}>
    {#each flowsData as flow, index}
      <option value={index}>{flow.flowName}</option>
    {/each}
  </select>
  <button on:click={hideNodeMsgDetail} class={nodeState.hideMsgDetail ? 'passive' : ''}>👁</button>
  <DownloadButton {nodes} fileName={flowName} />
  
  {#if flowsData[selectedFlowIndex] && flowsData[selectedFlowIndex].paths}
    <PathsDropdown
      paths={flowsData[selectedFlowIndex].paths}
      selectedFlowIndex={selectedFlowIndex}
      on:pathSelected={handlePathSelect}
    />
  {/if}
</div>

<style>
  .passive {
    opacity: 50%;
  }
  :global(.st-toolbox) {
    height: 50px;
    padding: 0.2rem 0.5rem;
  }
  :global(.st-toolbox button) {
    background-color: #FFFFFF;
    border-width: 0;
    padding: 5px;
    cursor: pointer;
  }
  :global(.st-toolbox button:hover) {
    outline: 1px dashed black;
  }
</style>