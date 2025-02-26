<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import "./rawlogs.css"

  // Props
  export let selectedFlowName;
  export let appName;

  // State
  let searchQuery = '';
  let logs = [];
  let selectedLog = null;
  let isPopupOpen = false;

  const host = 'http://localhost:7777';

  // Fetch logs based on the search query
  async function fetchLogs() {
    console.log(searchQuery);
    try {
      //TODO: appname, flowname, flow version in q
      const response = await fetch(`${host}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: searchQuery })
      });

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
  async function fetchLogDetails(appname, flowname, version, type, log_time) {
    try {
      const response = await fetch(`${host}/logs/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          appname,
          flowname,
          version,
          type,
          log_time
         })
      });

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
    // searchQuery = event.target.value;
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


<div class="logs-search">
  <div class="search-box">
    <form>
      <div class="form-group row">
        <div class="col">
          <input
            type="text"
            placeholder="Search logs... DETAIL=class name && MSG~NULL && KEY="
            bind:value={searchQuery}
          />
        </div>
        <div class="col-1">
          <button type="submit" class="btn btn-primary mb-2" on:click={handleSearchInput}>Search</button>
        </div>
      </div>
    </form>
  </div>



  <table class="logs-table table table-hover">
    <thead>
      <tr>
        <th class="col-1">Time</th>
        <th class="col-1">Type</th>
        <th class="col-2">Key</th>
        <th class="col-7">Message</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
      {#each logs as log}
        <tr>
          <td>{log.log_time}</td>
          <td><span class="logtype-{log.type}">{log.type === 1? "DEBUG" : log.type === 3 ? "WARN" : "ERROR"}</span></td>
          <td>{log.key ? log.key : ""}</td>
          <td>{log.msg}</td>
          <td>
            <span class="action-icon" on:click={() => fetchLogDetails(log.appname, log.flowname, log.version, log.type , log.log_time)}>
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
          <pre>{selectedLog.raw}</pre>
        {:else}
          <p>Loading...</p>
        {/if}
      </div>
    </div>
  {/if}
</div>