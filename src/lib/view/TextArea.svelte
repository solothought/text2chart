<script>
  import { getSelectedLines } from './selection.js';
  import { handleEditing } from './text-editor.js';
  import { onMount, afterUpdate } from 'svelte';
  import './TextArea.css';

  // Props
  export let text = ''; // The text content of the textarea
  export let placeholder = ''; // Optional placeholder text
  export let disabled = false; // Whether the textarea is disabled

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
    lineNumbers = lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("FLOW:")) {
        lineCount = 0; // Reset line count for new FLOW
        return null; // No line number for FLOW line
      } else if (trimmedLine.length === 0) {
        return null; // No line number for empty lines
      } else {
        return lineCount++; // Increment line count for non-empty lines
      }
    });
  }

  // Sync scrolling between textarea and line numbers
  function syncScroll(event) {
    if (lineNumbersContainer) {
      lineNumbersContainer.scrollTop = event.target.scrollTop;
    }
    if (highlightedTextContainer) {
      highlightedTextContainer.scrollTop = event.target.scrollTop;
      highlightedTextContainer.scrollLeft = event.target.scrollLeft;
    }
  }

  // Prevent scrolling on line numbers
  function preventLineNumberScroll(event) {
    if (lineNumbersContainer) {
      lineNumbersContainer.scrollTop = event.target.scrollTop;
    }
  }

  // Toggle collapse/expand for branch steps
  function toggleCollapse(index) {
    if (collapsedLines.has(index)) {
      collapsedLines.delete(index);
    } else {
      collapsedLines.add(index);
    }
  }

  // Highlight keywords, comments, and FLOW lines
  function highlightKeywords(text) {
    const lines = text.split('\n');
    const highlightedLines = lines.map(line => {
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

        let highlightedLine = line;
        Object.entries(keywords).forEach(([category, words]) => {
          words.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'g');
            highlightedLine = highlightedLine.replace(regex, `<span class="keyword ${category}">${word}</span>`);
          });
        });

        return highlightedLine;
      }
    });

    return highlightedLines.join('\n');
  }

  // Update the highlighted text container
  function updateHighlightedText() {
    if (highlightedTextContainer) {
      highlightedTextContainer.innerHTML = highlightKeywords(text);
    }
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
    {#each lineNumbers as lineNumber, index}
      {#if lineNumber !== null}
        <div class:highlighted={highlightedLines.includes(String(lineNumber))} on:click={() => toggleCollapse(index)}>
          {lineNumber}
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