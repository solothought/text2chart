<script>
  import SlimoChart from '$lib/SlimoChart.svelte';
  
  // Initialize nodes and edges
  let nodes = [
    { id: '1', type: 'step', position: { x: 250, y: 0 }, data: { msg: 'Start', isStart: true } },
    { id: '2', type: 'step', position: { x: 250, y: 150 }, data: { msg: 'Process', isEnd: false } }
  ];
  let edges = [
      { id: '1-2', source: '1', target: '2' }
  ];

</script>
  
<SlimoChart id="quarterChart" bind:nodes bind:edges /> style working due to id
<SlimoChart id="chart2" class="halfChart" {nodes} {edges} />  style working due to class
<SlimoChart class="halfChart" bind:nodes bind:edges /> style working due to class
<SlimoChart style="width:50%; height:50vh" bind:nodes bind:edges /> style working due to inline css

