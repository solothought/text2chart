<script>
  import { onMount } from 'svelte';
  import SlimoCharter from '$lib/SlimoChart.svelte';
  // import "./style.css";

  // Initialize nodes and edges
  let nodes = [
    { id: '1', type: 'step', position: { x: 250, y: 0 }, data: { msg: 'Start', isStart: true } },
    { id: '2', type: 'step', position: { x: 250, y: 150 }, data: { msg: 'Process', isEnd: false } }
  ];
  let edges = [
      { id: '1-2', source: '1', target: '2' }
  ];

  onMount(async () => {
    new SlimoCharter({ //style not working
      target: document.getElementById("quarterChart2"),
      props: {
        nodes: nodes,
        edges: edges
      }
    });
    // chart.draw(nodes, edges);

    new SlimoCharter({ //style working
      target: document.getElementById("quarterChart1"),
      props: {
        nodes: nodes,
        edges: edges,
        class: "halfChart"
      }
    });

  })
</script>
  
<div id="quarterChart1"></div> style working
<div id="quarterChart2" class="halfChart"></div> style not working
<div id="quarterChart2" style="width:100%, height:100%"></div> style not working