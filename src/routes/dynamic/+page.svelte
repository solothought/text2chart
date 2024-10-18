<script>
  // import { onMount } from 'svelte';
  import SlimoChart from '$lib/SlimoChart.svelte';
  let initialAlgo = `
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
finsh here
  `
  let flowText = '';
  
  function handleKeyUp(event) {
    flowText = event.target.value;
  }
$: flowText = initialAlgo;
</script>

<style>
  .container {
    display: flex;
  }
  .text-area {
    width: 30%;
    height: 100vh;
  }
</style>

<div class="container">
  <textarea 
    class="text-area" 
    on:keyup={handleKeyUp} 
    >{initialAlgo}

  </textarea>
  
  <SlimoChart style="padding-left:10px; width:65vw; height:100vh" text={flowText} />
</div>
