<script>
  import SlimoCharter from '$lib/SlimoCharter.svelte';
  
  // Initialize nodes and edges
  let nodes = [
    { id: '1', type: 'step', position: { x: 250, y: 0 }, data: { msg: 'Start', isStart: true } },
    { id: '2', type: 'step', position: { x: 250, y: 150 }, data: { msg: 'Process', isEnd: false } }
  ];
  let edges = [
      { id: '1-2', source: '1', target: '2' }
  ];

</script>
  
<SlimoCharter id="quarterChart" bind:nodes bind:edges /> style working due to id
<SlimoCharter id="chart2" class="halfChart" {nodes} {edges} />  style working due to class
<SlimoCharter class="halfChart" bind:nodes bind:edges /> style working due to class
<SlimoCharter style="width:50%; height:50vh" bind:nodes bind:edges /> style working due to inline css

