<script>
  import DebugIcon from './../icons/debug.svelte';
  import LogsIcon from './../icons/logs.svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
   // Panel state
  let panelVisible = false;
  let panelContent = { min: 0, avg: 0, max: 0 };
  let panelPosition = { top: 0, left: -100 };
  let hoveredLineNumber = "";
  let panel;
  let displayPanel = false;
  let hideTimeout; // Store the timeout ID for clearing

  // Show panel on hover
  export function showPanel(event, line) {
    if (line.exeTime) {
      panelContent = {
        min: line.exeTime.minExeTime,
        avg: line.exeTime.avgExeTime,
        max: line.exeTime.maxExeTime,
      };

      // Get the bounding rectangle of the hovered line number
      const lineNumberRect = event.target.getBoundingClientRect();

      // Calculate panel position relative to the line number
      panelPosition = {
        top: lineNumberRect.top, // Position relative to the container
        left: lineNumberRect.left + lineNumberRect.width, // Position to the right of the line number
      };

      hoveredLineNumber = line.lineNumber;
      panelVisible = true;
      displayPanel = true;
      panel.style.pointerEvents = "auto";
    }
  }

  // Hide panel
  export function hidePanel() {
    hideTimeout = setTimeout(()=>{
      if(!displayPanel){
        panel.style.pointerEvents = "none";
        panelVisible = false;
      }
    },100);
    displayPanel = false
    hoveredLineNumber = null;
  }

  // Handle toggle debug button click
  function handleToggleDebug() {
    dispatch('toggleDebug');
    hidePanel();
  }

  // Handle logs button click
  function handleShowLogs() {
    dispatch('showLogs');
    hidePanel();
  }


  function panelIn(event, line) {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    panelVisible = true;
    displayPanel = true;
  }

  </script>

<div
  class="panel"
  class:visible={panelVisible}
  style={`top: ${panelPosition.top}px; left: ${panelPosition.left}px`}
  on:mouseenter={panelIn}
  on:mouseleave={hidePanel}
  bind:this={panel}
  >
  <div>Min: {panelContent.min} ms</div>
  <div>Avg: {panelContent.avg} ms</div>
  <div>Max: {panelContent.max} ms</div>
  <div class="panel-icons">
    <button class="icon" on:click={handleToggleDebug}><DebugIcon/></button>
    <button class="icon" on:click={handleShowLogs}><LogsIcon/></button>
  </div>
</div>

<style>

.panel {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure panel is above other elements */
  pointer-events: auto; /* Allow interactions with the panel */
  opacity: 0; /* Hidden by default */
  transition: opacity 0.2s ease-in-out;
}

.panel.visible {
  opacity: 1; /* Visible when hovered */
}

.panel button{
  background-color: #FFFFFF;
  border-width: 0;
  padding: 5px;
  cursor: pointer;
}

.panel button:hover{
  outline: 1px dashed black;
}

</style>