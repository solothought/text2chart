<script>
  import { getSelectedLines } from './selection.js';
  import { handleEditing } from './text-editor.js';
  import { onMount, afterUpdate } from 'svelte';
  import { writable } from 'svelte/store';
  import './TextArea.css';

  import StepsStatsPanel from './StepsStatsPanel.svelte';

  // Props
  export let text = ''; // The text content of the textarea
  export let placeholder = ''; // Optional placeholder text
  export let disabled = false; // Whether the textarea is disabled
  export let stepsExecutionTimes = writable([]); // Execution time data
  export let mode = "editor"; // editor, monitor
  export let selection = {};

  // Events
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  let previousText = ''; // Track previous text for change detection
  let lineNumbers = []; // Array to hold line numbers
  let highlightedLines = []; // Array to hold highlighted lines
  let collapsedLines = new Set(); // Set to hold collapsed lines
  let lineNumbersContainer; // Reference to the line numbers container
  let textarea; // Reference to the textarea element
  let highlightedTextContainer; // Reference to the highlighted text container
  let stepsStatsPanel = {}; //instance

  // Emit text change events
  function emitTextChange(newText) {
    dispatch('textChange', { text: newText });
  }

  // Emit line selection events
  function emitLineSelection(selectedLines) {
    dispatch('lineSelection', { selectedLines });
  }

  // Handle key down events for text editing and highlighting
  function handleKeyDown(event) {
    const textarea = event.target;
    if (textarea.id === 'text-area') {
      handleEditing(event); // Handle editing (e.g., commenting)
      text = textarea.value;
      if (text.length !== previousText.length || text !== previousText) {
        previousText = text;
        highlightCurrentStepNode(event);
        emitTextChange(text); // Emit text change
        updateLineNumbers();
        updateHighlightedText();
      }
    }
  }

  // Highlight the current step node based on the selected lines
  function highlightCurrentStepNode(event) {
    const selectedLines = getSelectedLines(event.target, event.key, event.shiftKey);
    emitLineSelection(selectedLines); // Emit selected lines
    highlightedLines = selectedLines.nodeIds;
  }

  // Handle key up events to detect text changes
  function handleKeyUp(event) {
    const textarea = event.target;
    if (textarea.id === 'text-area') {
      if (text.length !== previousText.length || text !== previousText) {
        previousText = text;
        emitTextChange(text); // Emit text change
        updateLineNumbers();
        updateHighlightedText();
      }
    }
  }

  // Handle click events to highlight the current step
  function handleClick(event) {
    const textarea = event.target;
    if (textarea.id === 'text-area') {
      highlightCurrentStepNode(event);
    }
  }

  // Update line numbers based on the text content
  function updateLineNumbers() {
    const lines = text.split('\n');
    let lineCount = 0;
    let currentFlowIndex = -1;
    lineNumbers = lines.map((line, index) => {
      const trimmedLine = line.trim();
      //TODO: exclude header lines
      if (trimmedLine.startsWith("FLOW:")) {
        currentFlowIndex++;
        lineCount = -1; // Reset line count for new FLOW
        return null; // No line number for FLOW line
      } else if (trimmedLine.length === 0) {
        return null; // No line number for empty lines
      } else {
        lineCount++;
        let className = "";
        let exeTime = [];

        if(mode==="monitor"){
          exeTime = $stepsExecutionTimes.find(et => et.id === lineCount);
  
          // Check execution time for this line
          if (exeTime) {
            const maxThreshold = 400; // Max threshold in ms
            const avgExeTime = exeTime.avgExeTime;
            if (avgExeTime >= 0.9 * maxThreshold) {
              className = "red";
            } else if (avgExeTime >= 0.75 * maxThreshold) {
              className = "yellow";
            } else if (avgExeTime < 0.75 * maxThreshold) {
              className = "green";
            }
          }
        }else{//editor mode
          if(selection.flowIndex === currentFlowIndex ){
            const nodeIds = selection.nodeIndexes || selection.nodeIds;
            if(nodeIds && nodeIds.indexOf(String(lineCount)) !== -1)
              className = "green";
          }
        }
        return { lineNumber: lineCount, className, exeTime };
      }
    });
  }

  // Sync scrolling between textarea and line numbers
  function syncScroll(event) {
    const {scrollTop,scrollLeft} = event.target;
    lineNumbersContainer.scrollTop = scrollTop;
    highlightedTextContainer.scrollTop = scrollTop;
    highlightedTextContainer.scrollLeft = scrollLeft;
    if(highlightedTextContainer.scrollTop !== scrollTop){
      event.target.scrollTop = highlightedTextContainer.scrollTop;
      lineNumbersContainer.scrollTop = highlightedTextContainer.scrollTop;
    }
    // event.preventDefault();
  }

  // Prevent scrolling on line numbers
  function preventLineNumberScroll(event) {
    if (lineNumbersContainer) {
      lineNumbersContainer.scrollTop = event.target.scrollTop;
    }
  }

  // Highlight keywords, comments, and FLOW lines
  function highlightKeywords(text) {
    const lines = text.split('\n');
    const htmlLines = lines.map((line) => {
      if (line.trim().startsWith('#')) {
        // Highlight comment lines
        return `<span class="comment">${line}</span>`;
      } else if (line.trim().startsWith('FLOW:')) {
        // Highlight FLOW lines
        return `<span class="flow">${line}</span>`;
      } else {
        // Highlight other keywords
        const keywords = {
          branch: ["IF", "ELSE_IF", "ELSE", "LOOP"],
          leaving: ["GOTO", "SKIP", "STOP", "END"],
          normal: ["AND", "THEN", "BUT", "FOLLOW", "ERR"],
          other: ["FLOW", "FOLLOW"]
        };

        let htmlLine = line;
        Object.entries(keywords).forEach(([category, words]) => {
          words.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            htmlLine = htmlLine.replace(regex, `<span class="keyword ${category}">${word}</span>`);
          });
        });

        return `<span class="steptext">${htmlLine}</span>`;
      }
    });
    return htmlLines.join('\n');
  }

  // Update the highlighted text container
  function updateHighlightedText() {
    if (highlightedTextContainer) {
      highlightedTextContainer.innerHTML = highlightKeywords(text);
    }
  }

  function showPanel(e){
    if(mode === "monitor") stepsStatsPanel.showPanel(e, line);
  }
  $: {
    //Text is not being displayed on load without this code until user click on text area
    if (text !== previousText) {
      updateLineNumbers();
      updateHighlightedText();
    }
  }

  // Initialize line numbers on mount
  onMount(() => {
    updateLineNumbers();
    updateHighlightedText();
  });

  // Update line numbers after the component updates (e.g., when switching flows)
  afterUpdate(() => {
    updateLineNumbers();
    updateHighlightedText();
  });
</script>

<div id="text-area-container">
  <div id="line-numbers" bind:this={lineNumbersContainer} on:scroll={preventLineNumberScroll}>
    {#each lineNumbers as line, index}
      {#if line !== null}
        <div 
          class:highlighted={highlightedLines.includes(String(line.lineNumber))} class={line.className}
          on:mouseenter={showPanel}
          on:mouseleave={stepsStatsPanel.hidePanel}
          >
          {line.lineNumber}
        </div>
      {:else}
        <div>&nbsp;</div>
      {/if}
    {/each}
  </div>
  <div id="highlighted-text" bind:this={highlightedTextContainer}></div>
  <textarea
    id="text-area"
    bind:this={textarea}
    bind:value={text}
    {placeholder}
    {disabled}
    on:keyup={handleKeyUp}
    on:keydown={handleKeyDown}
    on:mouseup={handleClick}
    on:scroll={syncScroll}
  />
</div>

<!-- Panel -->
{#if mode==="monitor"}
  <StepsStatsPanel bind:this={stepsStatsPanel} />
{/if}
