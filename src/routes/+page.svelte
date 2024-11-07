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
  
<SlimoCharter id="chart1" bind:nodes bind:edges />
<SlimoCharter id="chart2" {nodes} {edges} />
<!-- <SlimoCharter style="width:100%; height:100vh" bind:nodes bind:edges /> -->

