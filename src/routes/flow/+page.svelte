<script>
  import FlowList from './FlowList.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {getSelectedLines} from './selection.js';
  import {flows as initialFlows, flowsText} from './SampleFlows.js';
  import {handleEditing} from './text-editor.js';

  import { 
    saveFlowText, 
    loadFlowText, 
    saveSelectedFlow, 
    loadSelectedFlowId, 
    saveFlowList, 
    loadFlowList 
  } from './browserStorage.js';

  // Use a writable store for flows to ensure reactivity
  let flows = writable([...initialFlows]);
  let selectedFlowId;
  let flowListComponent;
  let previousText = '';
  let nodesToHighlight = [];
  let flowText = '';
  let chartKey = 0; // Used to reinitialize the FlowChart component

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
    saveSelectedFlow(flowId);
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
      selectedFlowId = loadSelectedFlowId() ||1;
      
      flowListComponent.handleFlowSelection(selectedFlowId); //not working

      const storedFlows = loadFlowList();
      if (storedFlows) {
        flows.set(storedFlows);
      }
      
      initializeFlowText();
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
        const selectedFlow = $flows.find(flow => flow.id === selectedFlowId);
        saveFlowText(selectedFlowId, selectedFlow?.name, flowText);
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
        {selectedFlowId}
        on:flowSelected={handleFlowSelection}
        on:addFlow={handleAddFlow}
        on:removeFlow={handleRemoveFlow}
        bind:this={flowListComponent}
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