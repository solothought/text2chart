<script>
  import { onMount } from 'svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  // import "./style.css";

  const text = `
    FLOW: passed as parameter
    here you go
    IF go in loop
      LOOP until
        you're safe here even with a long sentence
        IF not
          but
        ELSE_IF else if
          STOP
        ELSE
          SKIP
    finsh here`;

  onMount(async () => {
    new FlowChart({ //style not working
      target: document.getElementById("quarterChart2"),
      props: {
        text: text,
      }
    });
    // chart.draw(nodes, edges);

    new FlowChart({ //style working
      target: document.getElementById("quarterChart1"),
      props: {
        text: text,
        class: "halfChart"
      }
    });

  })
</script>
  
<div id="quarterChart1"></div> style working
<div id="quarterChart" class="halfChart"></div> style not working
<div id="quarterChart" style="width:100%, height:100%"></div> style not working

<style>
  .halfChart{
    width: 50vw;
    height: 100vh;
  }
  #quarterChart{
    width: 50vw;
    height: 50vh;
  }
</style>