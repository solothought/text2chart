<script>
  import { getSelectedLines } from './selection.js';
  import { handleEditing } from './text-editor.js';

  // Props
  export let text = ''; // The text content of the textarea
  export let placeholder = ''; // Optional placeholder text
  export let disabled = false; // Whether the textarea is disabled

  // Events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let previousText = ''; // Track previous text for change detection

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
      highlightCurrentStepNode(event);
      handleEditing(event);
    }
  }

  // Highlight the current step node based on the selected lines
  function highlightCurrentStepNode(event) {
    const selectedLines = getSelectedLines(event.target, event.key, event.shiftKey);
    emitLineSelection(selectedLines); // Emit selected lines
  }

  // Handle key up events to detect text changes
  function handleKeyUp(event) {
    const textarea = event.target;
    if (textarea.id === 'text-area') {
      if (text.length !== previousText.length || text !== previousText) {
        previousText = text;
        emitTextChange(text); // Emit text change
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
</script>

<style>
  #text-area {
    width: 100%;
    height: 100%;
    border: 0;
    font-family: monospace; /* Use monospace font for code-like appearance */
    background-color: #f9f9f9;
    padding: 10px;
    box-sizing: border-box;
    resize: none; /* Disable resizing */
  }

  #text-area:disabled {
    background-color: #eee;
    cursor: not-allowed;
  }
</style>

<textarea
  id="text-area"
  bind:value={text}
  {placeholder}
  {disabled}
  on:keyup={handleKeyUp}
  on:keydown={handleKeyDown}
  on:mouseup={handleClick}
/>