<script>
  import { onMount } from 'svelte';
  import "./rawlogs.css"

  // Props
  export let selectedFlowName;
  export let appName;

  // State
  export let searchFlowQuery = '';
  let logs = [];
  let selectedLog = null;

  const host = 'http://localhost:7777';

  // Fetch logs based on the search query
  async function fetchLogs() {
    console.log(searchFlowQuery);
    try {
      //TODO: appname, flowname, flow version in q
      const response = await fetch(`${host}/logs/appName/${selectedFlowName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: searchFlowQuery })
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

  // Fetch logs on component mount
  onMount(() => {
    console.log(searchFlowQuery);
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
            placeholder="Search logs... REQID=kfjdnijn && STATUS=1 && REASON~invalid"
            bind:value={searchFlowQuery}
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
        <th class="col-1">Req ID</th>
        <th class="col">Status</th>
        <th class="col-7">Failure Reason</th>
        <th class="col-2">Reporting Time</th>
        <th class="col">Duration</th>
      </tr>
    </thead>
    <tbody>
      {#each logs as log}
        <tr>
          <td>{log.req_id}</td>
          <td class="text-center">{log.result === 1? "✅" : "❌"}</td>
          <td>{log.failure_reason ? log.failure_reason : ""}</td>
          <td>{log.log_time}</td>
          <td>{log.exec_time} ms</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>