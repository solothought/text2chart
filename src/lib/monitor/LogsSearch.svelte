<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Props
  export let selectedFlowName;
  export let appName;

  // State
  let searchQuery = '';
  let logs = [];
  let selectedLog = null;
  let isPopupOpen = false;

  const host = 'http://localhost:3000';

  // Fetch logs based on the search query
  async function fetchLogs() {
    try {
      const response = await fetch(`${host}/logs?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        logs = await response.json();
      } else {
        console.error("Error fetching logs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }

  // Fetch detailed log information
  async function fetchLogDetails(logId) {
    try {
      const response = await fetch(`${host}/logs/${logId}`);
      if (response.ok) {
        selectedLog = await response.json();
        isPopupOpen = true;
      } else {
        console.error("Error fetching log details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching log details:", error);
    }
  }

  // Handle search input change
  function handleSearchInput(event) {
    searchQuery = event.target.value;
    fetchLogs();
  }

  // Close the popup
  function closePopup() {
    isPopupOpen = false;
    selectedLog = null;
  }

  // Fetch logs on component mount
  onMount(() => {
    fetchLogs();
  });
</script>

<style>
  .logs-search {
    padding: 20px;
  }

  .search-box {
    margin-bottom: 20px;
  }

  .search-box input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .logs-table {
    width: 100%;
    border-collapse: collapse;
  }

  .logs-table th,
  .logs-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .logs-table th {
    background-color: #f4f4f4;
  }

  .action-icon {
    cursor: pointer;
    color: #007bff;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .popup-content {
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
</style>

<div class="logs-search">
  <div class="search-box">
    <input
      type="text"
      placeholder="Search logs..."
      bind:value={searchQuery}
      on:input={handleSearchInput}
    />
  </div>

  <table class="logs-table">
    <thead>
      <tr>
        <th>Time</th>
        <th>Type</th>
        <th>Key</th>
        <th>Message</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each logs as log}
        <tr>
          <td>{log.time}</td>
          <td>{log.type}</td>
          <td>{log.key}</td>
          <td>{log.message}</td>
          <td>
            <span class="action-icon" on:click={() => fetchLogDetails(log.id)}>
              📄
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if isPopupOpen}
    <div class="popup-backdrop" on:click={closePopup} />
    <div class="popup" transition:fade>
      <div class="popup-content">
        <h3>Log Details</h3>
        {#if selectedLog}
          <p><strong>Time:</strong> {selectedLog.time}</p>
          <p><strong>Type:</strong> {selectedLog.type}</p>
          <p><strong>Key:</strong> {selectedLog.key}</p>
          <p><strong>Message:</strong> {selectedLog.message}</p>
        {:else}
          <p>Loading...</p>
        {/if}
      </div>
    </div>
  {/if}
</div>