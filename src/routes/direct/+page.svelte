<script>
  import { onMount } from 'svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';

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
      target: document.getElementById("quarterChart"),
      props: {
        text: text,
        class: "halfChart"
      }
    });
    // chart.draw(nodes, edges);

    new FlowChart({ //style working
      target: document.getElementById("quarterChart1"),
      props: {
        text: text,
        style: "width: 50vw; height: 100vh;"
      }
    });
    
    new FlowChart({ //style working
      target: document.getElementById("quarterChart2"),
      props: {
        text: text,
      }
    });
    
    new FlowChart({ //style working
      target: document.getElementById("quarterChart3"),
      props: {
        text: text,
      }
    });
    new FlowChart({ //style working
      target: document.getElementById("quarterChart4"),
      props: {
        text: text,
      }
    });

  })
</script>
  
<div id="quarterChart"></div> style working
<div id="quarterChart1"></div> style working
<hr>
<div id="quarterChart2" class="halfChart"></div> style not working
<div id="quarterChart3"></div> style not working
<div id="quarterChart4" style="width: 50vw; height: 100vh;"></div> style not working

<style>
  :global(.halfChart){
    width: 50vw;
    height: 100vh;
  }
  #quarterChart3{
    width: 50vw;
    height: 50vh;
  }
</style>