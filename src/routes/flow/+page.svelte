<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  const storeKey = 'st-flow-algo';
  const storedValue = writable('');
  let updateLocalStorageDebounced;
  // export let windowAvailable = false;

  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {getSelectedLines} from './selection.js';
  import {algos} from './algos';
  import {handleEditing} from './text-editor.js';

  let previousText = '';
  let nodesToHighlight = [];
  let flowText = algos["Binary Search"];

  onMount(async () => {
    if (typeof window !== 'undefined') {
      // windowAvailable = true;

      const valFromStorage = localStorage.getItem(storeKey);
      flowText = valFromStorage || algos["Binary Search"];
  
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

  function loadAlgo(event){
    flowText = algos[event.target.value];
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
      <div >Load Example Flow of 
        <select on:change={loadAlgo} style="margin-left: 10px; padding:4px">
          {#each Object.keys(algos) as algoName}
            <option value={algoName} >{algoName}</option>
          {/each}
        </select>

      </div>
      <textarea id="text-area" bind:value={flowText} 
        on:keyup={handleKeyUp} 
        on:keydown={handleKeyDown} 
        on:mouseup={handleClick} />
    </div>
    <FlowChart style="padding-left:10px; width:65vw; height:100%" bind:text={flowText} bind:selection={nodesToHighlight}/>
  </div>
</div>