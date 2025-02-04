<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { nodeSize } from './../config.js';
  import BranchIcon from './../icons/branch.svelte';
  import LoopIcon from './../icons/loop.svelte';
  import ErrIcon from './../icons/error.svelte';
  import LinkExternalIcon from './../icons/linkExternal.svelte';

  export const fontSize = {desire: 15, min: 10, max: 80}

  function isOverflow(el) {
    return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  }

  function resizeText(element, parent) {
    let min = fontSize.min;
    let max = fontSize.max;
    let size = min;

    while (min <= max) {
      size = Math.floor((min + max) / 2);
      element.style.fontSize = `${size}px`;
      isOverflow(parent) ? max = --size : min = ++size;
    }

    element.style.fontSize = `${max}px`;
  }

  let containerElement;
  let textElement;

  function applyFit() {
    if (containerElement && textElement) {
      resizeText(textElement, containerElement);
    }
  }

  onMount(() => {
    applyFit();
  });

  afterUpdate(() => {
    applyFit();
  });


  export let data;  // Contains the node-specific data
  export let position;
  export let id;
  export let hidden = false;
</script>

<div style="position: absolute;">
  {#if data.type === "LOOP"}
    <div class="step-icon">
      <LoopIcon/>
    </div>
  {/if}
  {#if data.type === "IF" || data.type === "ELSE_IF"}
    <div class="step-icon">
      <BranchIcon/>
    </div>
  {/if}
  {#if data.type === "ERR" }
    <div class="step-icon">
      <ErrIcon/>
    </div>
  {/if}
  {#if data.type === "FOLLOW" }
    <div class="step-icon">
      <LinkExternalIcon/>
    </div>
  {/if}
</div>
<div class="{data.highlight ? 'hovered' : ''} {data.isEnd ? 'endStep':'step'} {data.type === 'FOLLOW' ? 'clickable' : ''}">
  <!-- <Handle class="hndl" id="tt" type="target" position={Position.Top} /> -->
  <Handle class="hndl" id="t" type="target" position={Position.Top} />
  <div class="step-container" style="width:{nodeSize.width}px; height:{nodeSize.height}px;" bind:this={containerElement}>
    <div class="msgWrapper">
      <p bind:this={textElement}>{data.hideMsgDetail ? data.msg : data.rawMsg}</p>
    </div>
  </div>
  <Handle class="hndl" id="b" type="source" position={Position.Bottom} />
  <Handle class="hndl" id="bt" type="target" position={Position.Bottom} />
  <Handle class="hndl" id="l" type="source" position={Position.Left} />
  <Handle class="hndl" id="lt" type="target" position={Position.Left} />
  <Handle class="hndl" id="r" type="source" position={Position.Right} />
  <Handle class="hndl" id="rt" type="target" position={Position.Right} />
</div>

<style>
  .msgWrapper{
    display: inline-block; 
    width: 100%; 
    height: 100%;
  }
  :global(.hndl) {
    visibility: hidden;
  }
  .clickable{
    cursor: pointer;
  }
  .endStep{
    padding: 5px;
    border-radius: 5px;
    background-color: black;
    color: white;
    border: 1px solid #555;
  }
  .step {
    padding: 5px;
    border-radius: 5px;
    background: white;
    color: inherit;
    border: 1px solid #555;
  }


  .step-container {
    position: relative;
    /* width: 150px;
    height: 50px; */
    text-align: center;
  }

  .hovered {
    border: 2px solid #FF4000;
    background-color: lightgrey;
    color: inherit;
  }

  .step-icon{
    width: 25px;
    height: 25px;
    top: -35px;
    position: absolute;
  }
</style>
