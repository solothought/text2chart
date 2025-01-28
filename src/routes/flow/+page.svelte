<script>
  import FlowList from '$lib/view/FlowList.svelte';
  import TextArea from '$lib/view/TextArea.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {flows as initialFlows, flowsText} from './SampleFlows.js';

  import { 
    saveFlowText, 
    loadFlowText, 
    saveSelectedFlowId, 
    loadSelectedFlowId, 
    saveFlowList, 
    loadFlowList 
  } from './browserStorage.js';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([...initialFlows]);
  let selectedFlowId = loadSelectedFlowId() ||1;
  let previousText = '';
  let nodesToHighlight = [];
  let flowText = '';
  let chartKey = 0; // Used to reinitialize the FlowChart component

  const storedFlows = loadFlowList();
  if(storedFlows)   flows.set(storedFlows);

  function initializeFlowText() {
    const selectedFlow = $flows.find(flow => flow.id === selectedFlowId);
    flowText = loadFlowText(selectedFlowId, selectedFlow?.name) || flowsText[selectedFlowId] || '';
  }

  /**
   * Load text from browser storage or from memory
   * @param event
   */
  function handleFlowSelection(event) {
    const flowId = event.detail.flowId;
    const selectedFlow = $flows.find(flow => flow.id === flowId);
    
    // Load text from storage or default
    const storedText = loadFlowText(flowId, selectedFlow?.name);
    flowText = storedText || flowsText[flowId] || '';
    
    selectedFlowId = flowId;
    saveSelectedFlowId(flowId);
    chartKey++;
  }

  /**
   * Add a new flow with empty algo text and update browser storage
   * @param event 
   */
   function handleAddFlow(event) {
    const newFlowName = event.detail.name.trim();
    
    if (!$flows.some(flow => flow.name.toLowerCase() === newFlowName.toLowerCase())) {
      flows.update((currentFlows) => {
        const newFlow = {
          id: currentFlows.length + 1,
          name: newFlowName,
          successPercentage: 0,
        };
        
        // Save empty text for new flow
        saveFlowText(newFlow.id, newFlow.name, '');
        saveFlowList([...currentFlows, newFlow]);
        
        // Set the new flow as the selected flow
        selectedFlowId = newFlow.id;
        saveSelectedFlowId(newFlow.id);
        initializeFlowText();
        chartKey++; // Reinitialize the chart

        return [...currentFlows, newFlow];
      });
    } else {
      alert('Flow with this name already exists');
    }
  }

  /**
   * Remove flow from memory and browser storage
   * @param event 
   */
   function handleRemoveFlow(event) {
    //TODO: confirm before deletion
    const flowId = event.detail.flowId;
    flows.update((currentFlows) => {
      const updatedFlows = currentFlows.filter(flow => flow.id !== flowId);
      saveFlowList(updatedFlows);
      return updatedFlows;
    });
  }

  /**
   * Load flows from browser storage if present
  */
  onMount(async () => {
    if (typeof window !== 'undefined') {
      initializeFlowText();
    }
  });

  // Handle text changes from the TextArea component
  function handleTextChange(event) {
    flowText = event.detail.text;
    const selectedFlow = $flows.find(flow => flow.id === selectedFlowId);
    saveFlowText(selectedFlowId, selectedFlow?.name, flowText);
  }

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
        {selectedFlowId}
        on:flowSelected={handleFlowSelection}
        on:addFlow={handleAddFlow}
        on:removeFlow={handleRemoveFlow}
      />

      <TextArea
        bind:text={flowText}
        on:textChange={handleTextChange}
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