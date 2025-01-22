<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let flows; // This is a Svelte store
  export let selectedFlowId;
  export let filterText = '';
  export let sortBy = 'name';
  export let sortDirection = 'asc';

  let showAddFlowPopup = false;
  let newFlowName = '';
  let isListExpanded = false; // Controls whether the list is expanded or collapsed

  // Use $flows to access the value of the store
  $: filteredFlows = $flows.filter(flow =>
    flow.name.toLowerCase().includes(filterText.toLowerCase())
  );

  $: sortedFlows = filteredFlows.sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'successPercentage') {
      return sortDirection === 'asc'
        ? a.successPercentage - b.successPercentage
        : b.successPercentage - a.successPercentage;
    }
    return 0;
  });

  // Function to handle sorting change
  function handleSortChange(newSortBy) {
    if (newSortBy === sortBy) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = newSortBy;
      sortDirection = 'asc';
    }
  }

  // Function to handle flow selection
  function handleFlowSelection(flowId) {
    selectedFlowId = flowId;
    isListExpanded = false; // Collapse the list after selection
    dispatch('flowSelected', { flowId });
  }

  // Function to handle adding a new flow
  function handleAddFlow() {
    showAddFlowPopup = true;
  }

  // Function to submit the new flow name
  function submitNewFlow() {
    if (newFlowName.trim()) {
      dispatch('addFlow', { name: newFlowName.trim() });
      newFlowName = '';
      showAddFlowPopup = false;
    }
  }

  // Function to handle flow removal
  function handleRemoveFlow(flowId) {
    dispatch('removeFlow', { flowId });
  }

  // Function to toggle the list expansion
  function toggleList() {
    isListExpanded = !isListExpanded;
  }
</script>

<style>
  .flow-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    position: relative;
  }

  .flow-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .selected-flow {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    cursor: pointer;
    height: 50px;
    overflow: hidden;

  }

  .selected-flow:hover {
    background-color: #f0f0f0;
  }

  .selected-flow .flow-name {
    font-weight: bold;
    color: #333;
  }

  .selected-flow .flow-percentage {
    color: #555;
    font-size: 0.9rem;
  }

  .add-flow-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }

  .add-flow-button:hover {
    background-color: #45a049;
  }

  .filter-sort-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .filter-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .sort-icons {
    display: flex;
    gap: 0.5rem;
  }

  .sort-icon {
    cursor: pointer;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;
  }

  .sort-icon.active {
    background-color: #4caf50;
    color: white;
  }

  .sort-icon:hover {
    background-color: #f0f0f0;
  }

  .expanded-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
  }

  .flow-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    position: relative;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .flow-item:hover {
    background-color: #f0f0f0;
  }

  .flow-item.selected {
    background-color: #e0f7fa;
    border-color: #4caf50;
  }

  .flow-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #4caf50;
    opacity: 0.3;
    z-index: 1;
    border-radius: 4px;
  }

  .flow-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .flow-name {
    font-weight: bold;
    color: #333;
  }

  .flow-percentage {
    margin-left: 1rem;
    color: #555;
    font-size: 0.9rem;
  }

  .remove-icon {
    margin-left: 1rem;
    color: #ff4444;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .flow-item:hover .remove-icon {
    opacity: 1;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
  }

  .popup input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .popup-buttons button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .popup-buttons button.cancel {
    background-color: #ccc;
  }

  .popup-buttons button.submit {
    background-color: #4caf50;
    color: white;
  }
</style>

<div class="flow-list">
  <!-- Header with selected flow and add flow button -->
  <div class="flow-header">
    <div class="selected-flow" on:click={toggleList}>
      <span class="flow-name">
        {#if selectedFlowId}
          {$flows.find(flow => flow.id === selectedFlowId)?.name || 'Select a flow'}
        {:else}
          Select a flow
        {/if}
      </span>
      <span class="flow-percentage">
        {#if selectedFlowId}
          {$flows.find(flow => flow.id === selectedFlowId)?.successPercentage || 0}%
        {/if}
      </span>
    </div>
    <button class="add-flow-button" on:click={handleAddFlow}>
      + 
    </button>
  </div>

  <!-- Expanded list (shown when isListExpanded is true) -->
  {#if isListExpanded}
    <div class="expanded-list">
      <div class="filter-sort-container">
        <input
          type="text"
          class="filter-input"
          bind:value={filterText}
          placeholder="Search for a flow"
        />
        <div class="sort-icons">
          <div
            class="sort-icon {sortBy === 'name' ? 'active' : ''}"
            on:click={() => handleSortChange('name')}
          >
            Sort by Name {sortBy === 'name' ? (sortDirection === 'asc' ? '▲' : '▼'):''}
          </div>
          <div
            class="sort-icon {sortBy === 'successPercentage' ? 'active' : ''}"
            on:click={() => handleSortChange('successPercentage')}
          >
            Sort by Success {sortBy === 'successPercentage' ? (sortDirection === 'asc' ? '▲' : '▼'):''}
          </div>
        </div>
      </div>
      {#each sortedFlows as flow}
        <div
          class="flow-item {selectedFlowId === flow.id ? 'selected' : ''}"
          on:click={() => handleFlowSelection(flow.id)}
        >
          <div
            class="flow-progress"
            style="width: {flow.successPercentage}%;"
          ></div>
          <div class="flow-content">
            <span class="flow-name">{flow.name}</span>
            <span class="flow-percentage">{flow.successPercentage}%</span>
            <span class="remove-icon" on:click|stopPropagation={() => handleRemoveFlow(flow.id)}>✕</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Add Flow Popup -->
  {#if showAddFlowPopup}
    <div class="popup-overlay">
      <div class="popup">
        <input
          type="text"
          bind:value={newFlowName}
          placeholder="Enter flow name"
        />
        <div class="popup-buttons">
          <button class="cancel" on:click={() => (showAddFlowPopup = false)}>
            Cancel
          </button>
          <button class="submit" on:click={submitNewFlow}>Submit</button>
        </div>
      </div>
    </div>
  {/if}
</div>