<script>
  import FlowList from '$lib/view/FlowList.svelte';
  import TextArea from '$lib/view/TextArea.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {flows as initialFlows, flowsText} from '$lib/editor/SampleFlows.js';

  import { 
    saveFlowText, 
    loadFlowText, 
    saveSelectedFlowName, 
    loadSelectedFlowName, 
    saveFlowList, 
    loadFlowList 
  } from '$lib/editor/browserStorage.js';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([...initialFlows]);
  let selectedFlowName = loadSelectedFlowName() || initialFlows[0]?.name;
  let previousText = '';
  let nodesToHighlight = [];
  let flowText = '';
  let chartKey = 0; // Used to reinitialize the FlowChart component

  const storedFlows = loadFlowList();
  if(storedFlows)   flows.set(storedFlows);

  function initializeFlowText() {
    const selectedFlow = $flows.find(flow => flow.name === selectedFlowName);
    flowText = loadFlowText(selectedFlow?.name) || flowsText[selectedFlow] || '';
  }

  /**
   * Load text from browser storage or from memory
   * @param event
   */
  function handleFlowSelection(event) {
    const flowName = event.detail.flowName;
    const selectedFlow = $flows.find(flow => flow.name === flowName);
    
    // Load text from storage or default
    const storedText = loadFlowText(flowName, selectedFlow?.name);
    flowText = storedText || flowsText[flowName] || '';
    
    selectedFlowName = flowName;
    saveSelectedFlowName(flowName);
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
          name: newFlowName,
          successPercentage: 0,
        };
        
        // Save empty text for new flow
        saveFlowText(newFlow.name, '');
        saveFlowList([...currentFlows, newFlow]);
        
        // Set the new flow as the selected flow
        selectedFlowName = newFlow.name;
        saveSelectedFlowName(newFlow.name);
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
    const flowName = event.detail.flowName;
    flows.update((currentFlows) => {
      const updatedFlows = currentFlows.filter(flow => flow.name !== flowName);
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
    const selectedFlow = $flows.find(flow => flow.name === selectedFlow);
    saveFlowText(selectedFlow, selectedFlow?.name, flowText);
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
        {selectedFlowName}
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