<script>
  // import { onMount } from 'svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {getSelectedLines} from '$lib/selection.js';
  let nodesToHighlight = [];
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
    if("text-area" === textarea.id){

      console.log(textarea.id);
      // console.log(event.key, event.shiftKey, event.ctrlKey)
      const selectedLines =getSelectedLines(event.target, event.key, event.shiftKey);
      nodesToHighlight = selectedLines;
      let text = textarea.value;  // Bound to the textarea
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      
      if (event.key === "Enter") {
        event.preventDefault();
        const beforeCursor = text.substring(0, start);
        const afterCursor = text.substring(end);
        const previousLine = beforeCursor.split("\n").pop() || "";
        const leadingSpaces = previousLine.match(/^\s*/)[0] || "";
        
        textarea.value = `${beforeCursor}\n${leadingSpaces}${afterCursor}`;
        moveCursor(beforeCursor.length + 1 + leadingSpaces.length);
      }
      else if (event.key === "Tab") {
        event.preventDefault();
        const spaces = "  "; //2
        const beforeCursor = text.substring(0, start);
        const afterCursor = text.substring(end);
  
        textarea.value = `${beforeCursor}${spaces}${afterCursor}`;
        moveCursor(beforeCursor.length + spaces.length);
      }
  
      function moveCursor(position){
        textarea.setSelectionRange(position, position); //from and to are same
      }
    }
  }
  function handleKeyUp(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      flowText = event.target.value;
    }
  }


  
$: flowText = initialAlgo;
</script>

<style>
  .container {
    display: flex;
  }
  #text-area {
    width: 30%;
    height: 100vh;
  }
</style>

<div class="container">
  <textarea id="text-area"
    on:keyup={handleKeyUp} 
    on:keydown={handleKeyDown} 
    
    >{initialAlgo}

  </textarea>
  
  <FlowChart style="padding-left:10px; width:65vw; height:100vh" bind:text={flowText} bind:selection={nodesToHighlight}/>
</div>
