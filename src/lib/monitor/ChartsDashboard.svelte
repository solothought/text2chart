<script>
  import { onMount } from 'svelte';
  import ChartTile from './ChartTile.svelte';
  import AddChartPopup from './AddChartPopup.svelte';
  import AddGraphIcon from "./../icons/addGraph.svelte"

  // Fixed tile data
  let fixedTileData = {
    versions: {
      title: 'Versions',
      content: 'Comparison between current and other versions of the API flow.'
    },
    errors: {
      title: 'Errors',
      content: 'Error logs and details for debugging.'
    }
  };

  // Dynamic tiles data
  let chartTiles = [];

  // Popup state
  let showPopup = false;

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

<!-- Toolbar -->
<div class="d-flex justify-content-between align-items-center border-bottom">
  <span class="p-1" on:click={togglePopup} style="cursor: pointer;">
    <AddGraphIcon />
  </span>
</div>



<!-- Fixed Tiles -->
<div class="row">
  <!-- Versions Tile -->
  <div class="col-4 text-center">
    <div class="h-100 d-flex flex-column justify-content-center align-items-center">
      <div class="card-body">
        <h3 class="card-title p-3">{fixedTileData.versions.title}</h3>
        <p class="p-4">
          <img src="versions.png" class="img-fluid" alt="Versions" />
        </p>
      </div>
    </div>
  </div>

  <!-- Errors Tile -->
  <div class="col-4 text-center">
    <div class="h-100">
      <div class="card-body">
        <h3 class="card-title p-3">{fixedTileData.errors.title}</h3>
        <p class="card-text">
          <img src="errors_graph.png" />
        </p>
      </div>
    </div>
  </div>
</div>

<!-- Dynamic Tiles -->
{#if chartTiles.length > 0}
  <div class="row g-3 mt-3">
    {#each chartTiles as tile}
      <div class="col-md-4">
        <ChartTile {tile} />
      </div>
    {/each}
  </div>
{/if}

<!-- Add Chart Popup -->
{#if showPopup}
  <AddChartPopup on:addChart={addChart} on:close={togglePopup} />
{/if}