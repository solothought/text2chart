<script>
  // import { onMount } from 'svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';
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
  
  function handleKeyDown(event) {
    const textarea = event.target;
    let text = textarea.value;  // Bound to the textarea
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (event.key === "Enter") {
      event.preventDefault();
      const beforeCursor = text.substring(0, start);
      const afterCursor = text.substring(end);
      // console.log(beforeCursor.length)
      const previousLine = beforeCursor.split("\n").pop() || "";
      const leadingSpaces = previousLine.match(/^\s*/)[0] || "";

      textarea.value = `${beforeCursor}\n${leadingSpaces}${afterCursor}`;
      const newCursorPosition = beforeCursor.length + 1 + leadingSpaces.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }
    else if (event.key === "Tab") {
      event.preventDefault();
      // const TAB_SIZE = 2;
      const spaces = "  ";

      const beforeCursor = text.substring(0, start);
      const afterCursor = text.substring(end);

      textarea.value = `${beforeCursor}${spaces}${afterCursor}`;
      const newCursorPosition = beforeCursor.length + spaces.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }
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
    on:keydown={handleKeyDown} 
    
    >{initialAlgo}

  </textarea>
  
  <FlowChart style="padding-left:10px; width:65vw; height:100vh" bind:text={flowText} />
</div>
