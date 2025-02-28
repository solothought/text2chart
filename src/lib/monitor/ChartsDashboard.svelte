<script>
  import { onMount } from 'svelte';
  import ChartTile from './ChartTile.svelte';
  import AddChartPopup from './AddChartPopup.svelte';

  // Fixed tile data
  let fixedTileData = {
    startDate: '', // Build date
    lastLogsDate: '' // Last logs date
  };

  // Dynamic tiles data
  let chartTiles = [];

  // Popup state
  let showPopup = false;

  // Fetch fixed tile data (API call simulation)
  onMount(async () => {
    // Simulate API call to fetch fixed tile data
    const response = await fetch('/api/fixed-tile-data');
    fixedTileData = await response.json();
  });

  // Function to handle adding a new chart
  async function addChart(chartDetails) {
    try {
      // Call backend to store chart details and get chart ID
      const response = await fetch('/api/add-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chartDetails)
      });
      const { chartId } = await response.json();

      // Fetch chart data using chart ID
      const chartDataResponse = await fetch(`/api/chart-data/${chartId}`);
      const chartData = await chartDataResponse.json();

      // Add new chart tile
      chartTiles = [...chartTiles, { id: chartId, ...chartData }];
    } catch (error) {
      console.error('Error adding chart:', error);
    }
  }

  // Function to toggle popup
  function togglePopup() {
    showPopup = !showPopup;
  }
</script>

<!-- Fixed Tile -->
<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">API Flow Comparison</h5>
    <p class="card-text">
      <strong>Start Date:</strong> {fixedTileData.startDate || 'N/A'}<br />
      <strong>Last Logs Date:</strong> {fixedTileData.lastLogsDate || 'N/A'}
    </p>
  </div>
</div>

<!-- Dynamic Tiles -->
<div class="row">
  {#each chartTiles as tile}
    <div class="col-md-4 mb-3">
      <ChartTile {tile} />
    </div>
  {/each}
</div>

<!-- Add Chart Button -->
<button class="btn btn-primary" on:click={togglePopup}>Add Chart</button>

<!-- Add Chart Popup -->
{#if showPopup}
  <AddChartPopup on:addChart={addChart} on:close={togglePopup} />
{/if}