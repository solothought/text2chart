<script>
  import DownloadButton from './../DownloadButton.svelte'; // Your existing download button component

  export let flowsData = [];
  export let selectedFlowIndex;
  export let flowName = "";
  export let nodeConfig = {};
  export let nodes = [];

  // Event handlers passed from the parent
  export let handleFlowChange;
  export let hideNodeMsgDetail;
</script>

<div class="st-toolbox">
  <!-- Flow Selector -->
  <select class="st-flow-chart-tool" on:change={handleFlowChange} bind:value={selectedFlowIndex}>
    {#each flowsData as flow, index}
      <option value={index}>{flow.flowName}</option>
    {/each}
  </select>
  <button on:click={hideNodeMsgDetail} class={nodeConfig.hideMsgDetail ? 'passive' : ''}>👁</button>
  <DownloadButton {nodes} fileName={flowName} />
</div>

<style>
  .passive {
    opacity: 50%;
  }
  :global(.st-toolbox) {
    height: 40px;
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
