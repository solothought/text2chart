<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  import "./flow-list.css";
  
  export let flows; // This is a Svelte store;  Use $flows to access the value of the store
  export let selectedFlow;
  export let selectedFlowName;
  export let filterText = '';
  export let sortBy = 'name';
  export let sortDirection = 'asc';
  export let mode = "editor"; // editor, monitor

  let showAddFlowPopup = false;
  let newFlowName = '';
  let isListExpanded = false; // Controls whether the list is expanded or collapsed
  let selectedApp = ''; // New variable to store the selected application

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
  export function handleFlowSelection(flow) {
    selectedFlow = flow;
    selectedFlowName = flow.name;
    isListExpanded = false; // Collapse the list after selection
    dispatch('flowSelected', { flowName: selectedFlowName });
  }

  // Function to handle application selection
  function handleAppSelection(event) {
    selectedApp = event.target.value;
    filterText = ''; // Reset filter text when app changes
    selectedFlowName = ''; // Reset selected flow when app changes
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
  function handleRemoveFlow(flowName) {
    dispatch('removeFlow', { flowName });
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

  $: selectedFlow = $flows.find(flow => flow.name === selectedFlowName);
  $: appList = [...new Set($flows.map(flow => flow.app))]; // Get unique application names
  $: appFilteredFlows = selectedApp ? $flows.filter(flow => flow.app === selectedApp) : $flows; // Filter flows by selected app
</script>

<div class="{mode === 'editor' ? 'editor-mode' : 'monitor-mode'}">
  
  <!-- Row: App List + Flow Header -->
  <div class="header-row">
    {#if mode === 'monitor'}
    <div class="app-list">
      <select class="app-dropdown" on:change={handleAppSelection}>
        <option value="">Select an app</option>
        {#each appList as app}
          <option value={app} selected={selectedApp === app}>{app}</option>
        {/each}
      </select>
    </div>
    {/if}
    <div class="flow-header">
      <div class="selected-flow" on:click={toggleList}>
        <span class="flow-name">
          {#if selectedFlowName}
            {$flows.find(flow => flow.name === selectedFlowName)?.name || 'Select a flow'}
          {:else}
            Select a flow
          {/if}
        </span>
        <span class="flow-percentage">
          {#if selectedFlowName && mode === "monitor" }
            {$flows.find(flow => flow.name === selectedFlowName)?.successPercentage || 0}%
          {/if}
        </span>
      </div>
      {#if mode !== "monitor"}
        <button class="add-flow-button" on:click={handleAddFlow}>
          + 
        </button> 
      {/if}
    </div>
  </div>

  <!-- Row: Flows -->
  <div class="flow-list-container">
    <div class="flow-list ">

      <!-- Second Row: Flow Stats -->
      {#if mode === "monitor"}
        <div class="flow-stats">
          <span class="info"><strong>success</strong>: {selectedFlow?.successPercentage || 0}%</span>
          <span class="info"><strong>err</strong>: {selectedFlow?.errors || 0}</span>
          <span class="info"><strong>avg</strong>: {selectedFlow?.avgExecutionTime || 0}ms</span>
          <span class="info"><strong>max</strong>: {selectedFlow?.maxExecutionTime || 0}ms</span>
        </div>
      {/if}
    
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
              <div  role="button" tabindex="1"
                class="sort-icon {sortBy === 'name' ? 'active' : ''}"
                on:click={() => handleSortChange('name')}
              >
                {sortBy === 'name' ? (sortDirection === 'asc' ? 'Z▲' : 'A▼') : 'AZ'}
              </div>
            {#if mode === "monitor" }
              <div  role="button" tabindex="2"
                class="sort-icon {sortBy === 'successPercentage' ? 'active' : ''}"
                on:click={() => handleSortChange('successPercentage')}
              >
                {sortBy === 'successPercentage' ? (sortDirection === 'asc' ? '✔️▲' : '✔️▼') : '✔️'}
              </div>
              <div role="button" tabindex="3"
                class="sort-icon {sortBy === 'errors' ? 'active' : ''}"
                on:click={() => handleSortChange('errors')}
              >
              {sortBy === 'errors' ? (sortDirection === 'asc' ? '🐞▲' : '🐞▼') : '🐞'}
              </div>
              <div role="button" tabindex="4"
                class="sort-icon {sortBy === 'avgExecutionTime' ? 'active' : ''}"
                on:click={() => handleSortChange('avgExecutionTime')}
              >
              {sortBy === 'avgExecutionTime' ? (sortDirection === 'asc' ? '⌛▲' : '⌛▼') : '⌛'}
              </div>
            {/if}
            </div>
          </div>
          {#each appFilteredFlows as flow}
            <div class="flow-item-container">
              {#if mode === "monitor" }
              <div class="avg-execution-time">
                {flow.avgExecutionTime || 0} ms
              </div>
              {/if}
              <div  role="combobox" tabindex="0"
                class="flow-item {selectedFlowName === flow.name ? 'selected' : ''}"
                on:click={() => handleFlowSelection(flow)}
              >
              {#if mode === "monitor"}
                <div
                  class="flow-progress"
                  style="width: {flow.successPercentage}%; background-color: {getProgressBarColor(flow.successPercentage)};"
                  title="Success Ratio: {flow.successPercentage}%"
                ></div>
              {/if}
                <div class="flow-content">
                  <span class="flow-name">{flow.name}</span>
                  {#if flow.errors && mode === "monitor"}
                    <span class="error-badge">{flow.errors}</span>
                  {/if}
                  {#if mode === "monitor"}
                    <span class="chart-button" on:click|stopPropagation={() => alert('Open charts for ' + flow.name)}>🗠</span>
                  {/if}
                  {#if mode !== "monitor"}
                    <span class="remove-icon" on:click|stopPropagation={() => handleRemoveFlow(flow.name)}>✕</span>
                  {/if}
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
  </div>

</div>