<script>
  import { createEventDispatcher } from 'svelte';
  import BranchIcon from './../icons/branch.svelte'; // Import the BranchIcon

  export let paths = [];
  export let selectedFlowIndex = 0;

  // State to manage dropdown visibility
  let showDropdown = false;

  // Dispatch function to emit custom events
  const dispatch = createEventDispatcher();

  // Function to toggle dropdown visibility
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  // Function to handle path selection
  function handlePathSelect(pathIndex) {
    if (paths && paths[pathIndex]) {
      const path = paths[pathIndex];
      dispatch('pathSelected', {
        flowIndex: selectedFlowIndex,
        nodeIds: path.filter(nodeId => nodeId !== -1) // Filter out the -1 (end of path)
      });
    }
    showDropdown = false; // Hide the dropdown after selection
  }
</script>

<div class="paths-dropdown-container">
  <!-- BranchIcon Button -->
  <button on:click={toggleDropdown}>
    <BranchIcon />
  </button>

  <!-- Dropdown -->
  {#if showDropdown && paths.length > 0}
    <div class="paths-dropdown">
      {#each paths as path, index}
        <div class="path-item" on:click={() => handlePathSelect(index)}>
          Path {index + 1} ({path.filter(nodeId => nodeId !== -1).length} steps)
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .paths-dropdown-container {
    position: relative;
    display: inline-block;
  }

  .paths-dropdown {
    position: absolute;
    top: 100%;
    /* right: 0; */
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 200px;
  }

  .path-item {
    padding: 8px 16px;
    cursor: pointer;
  }

  .path-item:hover {
    background-color: #f0f0f0;
  }
</style>