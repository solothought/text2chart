<script>
  import FlowList from './FlowList.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  const storeKey = 'st-flow-algo';
  const storedValue = writable('');
  let updateLocalStorageDebounced;
  // export let windowAvailable = false;

  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {getSelectedLines} from './selection.js';
  import {flows as initialFlows, flowsText} from './SampleFlows.js';
  import {handleEditing} from './text-editor.js';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([...initialFlows]);
  let selectedFlowId = 1;

  // Function to handle flow selection
  function handleFlowSelection(event) {
    selectedFlowId = event.detail.flowId;
    // console.log('Selected Flow ID:', selectedFlowId);
    flowText  = flowsText[selectedFlowId];
    chartKey++;
  }

  // Function to handle adding a new flow
  function handleAddFlow(event) {
    const newFlowName = event.detail.name;

    flows.update((currentFlows) => {
      const newFlow = {
        id: currentFlows.length + 1, // Generate a new ID
        name: newFlowName,
        successPercentage: 0, // Default success percentage
      };
      console.log('Added Flow:', newFlow);
      return [...currentFlows, newFlow]; // Update flows immutably
    });
  }

  // Function to handle removing a flow
  function handleRemoveFlow(event) {
    const flowId = event.detail.flowId;
    // flows = flows.filter(flow => flow.id !== flowId);
    flows.update(
      (currentFlows) => currentFlows.filter(flow => flow.id !== flowId));
    console.log('Removed Flow ID:', flowId);
  }

  let previousText = '';
  let nodesToHighlight = [];
  let flowText = flowsText[1];
  let chartKey = 0; // Used to reinitialize the FlowChart component

  onMount(async () => {
    if (typeof window !== 'undefined') {
      // windowAvailable = true;

      const valFromStorage = localStorage.getItem(storeKey);
      flowText = valFromStorage || flowsText[1];
  
      updateLocalStorageDebounced = (value) => {
        clearTimeout(updateLocalStorageDebounced.timeout);
        updateLocalStorageDebounced.timeout = setTimeout(() => {
          localStorage.setItem(storeKey, value);
        }, 500);
      }
  
      // Subscribe to changes in storedValue and update localStorage with debouncing
      const unsubscribe = storedValue.subscribe(value => {
        updateLocalStorageDebounced(value);
      });
  
      // Cleanup function to unsubscribe
      return () => {
        unsubscribe();
        clearTimeout(updateLocalStorageDebounced.timer);
      };
    }
  });

  /**
   * Ease text editing & to highlight current  step on graph
   * @param event
   */
  function handleKeyDown(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      highlightCurrentStepNode(event)
      handleEditing(event);
    }
  }

  function highlightCurrentStepNode(event){
    const selectedLines =getSelectedLines(event.target, event.key, event.shiftKey);
    nodesToHighlight = selectedLines;
  }

  /**
   * Update graph if flow gets change
   * @param event
   */
  function handleKeyUp(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      if (flowText.length !== previousText.length || flowText !== previousText) {
        storedValue.set(flowText);
        updateLocalStorageDebounced(flowText);
        previousText = flowText;
      }
    }
  }

  /**
   * Highlight current step on graph
   * @param event
   */
  function handleClick(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      highlightCurrentStepNode(event);
    }
  }

  
</script>

<style>
  .workspace {
    margin-top:80px;
    display: flex;
    height: calc(100vh - 100px);
  }
  .left-panel{width: 30vw; height: 100%; border-right: 1px dashed black;}
  #text-area {
    width: 100%;
    height: 100%;
    border:0;
  }
</style>
<div class="container-fluid">
  <div class="workspace">
    <div class="left-panel">
      <FlowList
        {flows}
        bind:selectedFlowId
        on:flowSelected={handleFlowSelection}
        on:addFlow={handleAddFlow}
        on:removeFlow={handleRemoveFlow}
      />

      <textarea id="text-area" bind:value={flowText} 
        on:keyup={handleKeyUp} 
        on:keydown={handleKeyDown} 
        on:mouseup={handleClick} />
    </div>
    {#key chartKey} <!-- Recreate Chart component -->
    <FlowChart 
      style="padding-left:10px; width:65vw; height:100%" 
      bind:text={flowText} 
      bind:selection={nodesToHighlight}/>
    {/key}
  </div>
</div>