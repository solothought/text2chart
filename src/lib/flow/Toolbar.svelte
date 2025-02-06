<script>
  import DownloadButton from './../DownloadButton.svelte';
  import PathsDropdown from './PathsDropdown.svelte';
  import LongTextIcon from './../icons/longText.svelte';
  import ShortTextIcon from './../icons/shortText.svelte';
  import FocusIcon from './../icons/focus.svelte';

  export let flowsData = [];
  export let selectedFlowIndex;
  export let flowName = "";
  export let hideMsgDetail = true;
  export let nodes = [];
  export let handleFlowChange;
  export let hideStepMsgDetail;
  export let focusOn = true;

  // Dispatch function to emit custom events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Function to handle path selection from PathsDropdown
  function handlePathSelect(event) {
    dispatch('pathSelected', event.detail);
  }

  function toggleFocus(){
    focusOn = !focusOn;
  }
  
</script>

<div class="st-toolbox">
  <select class="st-flow-chart-tool" on:change={handleFlowChange} bind:value={selectedFlowIndex}>
    {#each flowsData as flow, index}
      <option value={index}>{flow.flowName}</option>
    {/each}
  </select>
  <button on:click={hideStepMsgDetail}>
    {#if !hideMsgDetail}
      <LongTextIcon height="24px" />
    {/if}
    {#if hideMsgDetail}
      <ShortTextIcon height="24px" />
    {/if}
  </button>
  <DownloadButton {nodes} fileName={flowName} />
  
  {#if flowsData[selectedFlowIndex] && flowsData[selectedFlowIndex].paths}
    <PathsDropdown
      {nodes}
      paths={flowsData[selectedFlowIndex].paths}
      selectedFlowIndex={selectedFlowIndex}
      on:pathSelected={handlePathSelect}
    />
  {/if}
  <button on:click={toggleFocus} class="{focusOn?'':'passive'}">
    <FocusIcon/>
  </button>
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