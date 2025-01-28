<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { onMount } from 'svelte';
  export let flows; // This is a Svelte store;  Use $flows to access the value of the store
  export let selectedFlowId;
  export let filterText = '';
  export let sortBy = 'name';
  export let sortDirection = 'asc';

  let showAddFlowPopup = false;
  let newFlowName = '';
  let isListExpanded = false; // Controls whether the list is expanded or collapsed

  onMount(()=>{
    console.log(selectedFlowId);
  })

  function isDuplicateFlowName(name) {
    return $flows.some(flow => flow.name.toLowerCase() === name.toLowerCase());
  }

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
        ? (a.successPercentage||0) - (b.successPercentage||0)
        : (b.successPercentage||0) - (a.successPercentage||0);
    } else if (sortBy === 'errors') {
      return sortDirection === 'asc'
        ? (a.errors||0) - (b.errors||0)
        : (b.errors||0) - (a.errors||0);
    } else if (sortBy === 'avgExecutionTime') {
      return sortDirection === 'asc'
        ? (a.avgExecutionTime||0) - (b.avgExecutionTime||0)
        : (b.avgExecutionTime||0) - (a.avgExecutionTime||0);
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
  export function handleFlowSelection(flowId) {
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
    const name = newFlowName.trim();
    if (name) {
      if (!isDuplicateFlowName(name)) {
        dispatch('addFlow', { name });
        newFlowName = '';
        showAddFlowPopup = false;
      } else {
        alert('Flow with this name already exists');
      }
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

  // Function to get progress bar color based on success percentage
  function getProgressBarColor(successPercentage) {
    if (successPercentage > 90) return '#4caf50'; // Green
    if (successPercentage < 50) return '#ff4444'; // Red
    return '#ffc107'; // Yellow
  }
</script>

<style>
  .flow-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 0.2rem 1rem;
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
    font-size: 0.8rem;
  }

  .sort-icon-label {
    padding: 0.5rem;
  }

  .sort-icon {
    cursor: pointer;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
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

  .flow-item-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .avg-execution-time {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    font-size: 0.6rem;
    color: #555;
    padding: 0.5rem 0;
  }

  .flow-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
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

  .error-badge {
    position: absolute;
    top: -25px;
    right: -10px;
    background-color: #ff4444;
    color: white;
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    font-size: 0.6rem;
  }

  .chart-button {
    position: absolute;
    right: 3rem; /* Positioned just before the remove-icon */
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    font-size: 2rem; /* Fixed size */
  }

  .flow-item:hover .chart-button {
    opacity: 1;
  }

  .remove-icon {
    position: absolute;
    right: 1rem; /* Fixed position */
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    font-size: 1rem; /* Fixed size */
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
          <div class="sort-icon-label">Sort By</div>
          <div
            class="sort-icon {sortBy === 'name' ? 'active' : ''}"
            on:click={() => handleSortChange('name')}
          >
            {sortBy === 'name' ? (sortDirection === 'asc' ? 'Z▲' : 'A▼') : 'AZ'}
          </div>
          <div
            class="sort-icon {sortBy === 'successPercentage' ? 'active' : ''}"
            on:click={() => handleSortChange('successPercentage')}
          >
            {sortBy === 'successPercentage' ? (sortDirection === 'asc' ? '✔️▲' : '✔️▼') : '✔️'}
          </div>
          <div
            class="sort-icon {sortBy === 'errors' ? 'active' : ''}"
            on:click={() => handleSortChange('errors')}
          >
           {sortBy === 'errors' ? (sortDirection === 'asc' ? '🐞▲' : '🐞▼') : '🐞'}
          </div>
          <div
            class="sort-icon {sortBy === 'avgExecutionTime' ? 'active' : ''}"
            on:click={() => handleSortChange('avgExecutionTime')}
          >
           {sortBy === 'avgExecutionTime' ? (sortDirection === 'asc' ? '⌛▲' : '⌛▼') : '⌛'}
          </div>
        </div>
      </div>
      {#each sortedFlows as flow}
        <div class="flow-item-container">
          <div class="avg-execution-time">
            {flow.avgExecutionTime || 0} ms
          </div>
          <div
            class="flow-item {selectedFlowId === flow.id ? 'selected' : ''}"
            on:click={() => handleFlowSelection(flow.id)}
          >
            <div
              class="flow-progress"
              style="width: {flow.successPercentage}%; background-color: {getProgressBarColor(flow.successPercentage)};"
              title="Success Ratio: {flow.successPercentage}%"
            ></div>
            <div class="flow-content">
              <span class="flow-name">{flow.name}</span>
              {#if flow.errors}
                <span class="error-badge">{flow.errors}</span>
              {/if}
              <span class="chart-button" on:click|stopPropagation={() => alert('Open charts for ' + flow.name)}>🗠</span>
              <span class="remove-icon" on:click|stopPropagation={() => handleRemoveFlow(flow.id)}>✕</span>
            </div>
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