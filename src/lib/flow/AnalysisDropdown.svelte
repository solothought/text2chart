<script>
  import AnalysisIcon from './../icons/analysis.svelte';// Import the BranchIcon

  export let stats = {};
  export let paths = [];
  // State to manage dropdown visibility
  let showDropdown = false;

  // Function to toggle dropdown visibility
  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

</script>

<div class="analysis-dropdown-container">
  <button on:click={toggleDropdown}>
    <AnalysisIcon />
  </button>

  <!-- Dropdown -->
  {#if showDropdown}
    <div class="analysis-dropdown">
      <!-- <div class="path-item">
        <strong>Algorithm Analysis</strong>
      </div> -->
      <table class="analysis-table">
        <tbody>
          <tr>
            <td>Cyclomatic Complexity</td>
            <td>{stats.cyclomaticComplexity}</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>{stats.depth}</td>
          </tr>
          <tr>
            <td>Decision Points</td>
            <td>{stats.decisionPoints}</td>
          </tr>
          <tr>
            <td>Number of Steps</td>
            <td>{stats.stepsCount}</td>
          </tr>
          <tr>
            <td>Loop Complexity</td>
            <td>O(n<sup>{stats.nestingLoops.length}</sup>)</td>
          </tr>
          <tr>
            <td>Best Case</td>
            <td>{paths[0].length} Steps</td>
          </tr>
          <tr>
            <td>Worst Case</td>
            <td>{paths[paths.length-1].length} Steps</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .analysis-dropdown-container {
    position: relative;
    display: inline-block;
  }

  .analysis-dropdown {
    position: absolute;
    top: 100%;
    /* right: 0; */
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 400px;
  }

.analysis-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px;
}

</style>