<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { onMount, afterUpdate } from 'svelte';
  import { nodeSize } from './config.js';

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
</script>

<div class="{data.highlight ? 'hovered' : ''} {data.isEnd ? 'endStep':'step'}">
  <div style="position: absolute;">
    {#if data.type === "LOOP"}
      <svg class="icon {data.isEnd ? 'invert':''}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="49px" height="42px" viewBox="-0.5 -0.5 49 42"><g><g data-cell-id="0"><g data-cell-id="1"><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-2"><g><path d="M 44 23.11 C 44 34.65 35.05 44 24 44 C 12.95 44 4 34.65 4 23.11 C 4 11.57 12.95 2.22 24 2.22" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,24,20.5)" pointer-events="all"/><path d="M 24 -3 L 31.5 2.22 L 24 7.44 Z" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,24,20.5)" pointer-events="all"/></g></g><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-5"/><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-6"/><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-3"/><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-4"/><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-8"/></g></g></g></svg>    
    {/if}
    {#if data.type === "IF" || data.type === "ELSE_IF"}
      <svg class="icon {data.isEnd ? 'invert':''}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="78px" height="112px" viewBox="-0.5 -0.5 78 112"><g><g data-cell-id="0"><g data-cell-id="1"><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-2"/><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-5"><g><path d="M 11 21 Q 11 61 57 61" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" pointer-events="stroke"/></g></g><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-6"><g><path d="M 11 21 L 11 91" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" pointer-events="stroke"/></g></g><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-3"><g><ellipse cx="11" cy="11" rx="10" ry="10" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" pointer-events="all"/></g></g><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-4"><g><ellipse cx="67" cy="61" rx="10" ry="10" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" pointer-events="all"/></g></g><g data-cell-id="cL7QPJKOe-qMU4ihb_zf-8"><g><ellipse cx="11" cy="101" rx="10" ry="10" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" pointer-events="all"/></g></g></g></g></g></svg>
    {/if}
  </div>
  <!-- <Handle class="hndl" id="tt" type="target" position={Position.Top} /> -->
  <Handle class="hndl" id="t" type="target" position={Position.Top} />
  <div class="container" style="width:{nodeSize.width}px; height:{nodeSize.height}px;" bind:this={containerElement}>
    <div class="msgWrapper">
      <p bind:this={textElement}>{data.msg}</p>
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


  .container {
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

   .icon{
    width: 25px;
    height: 25px;
   }

   svg.invert {
    filter: invert(1); /* Invert the colors of the SVG */
  }
</style>
