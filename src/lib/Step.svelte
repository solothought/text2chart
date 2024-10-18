<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { fit, parent_style } from '@leveluptuts/svelte-fit';

  // import { hoverId } from './stores.js'; // Import shared store
  export let id;  // node id
  // export let type;  // node type
  // export let selected;
  // export let selectable;
  // export let deletable;
  // export let sourcePosition;
  // export let targetPosition;
  // export let zIndex;
  // export let dragging;
  // export let draggable;
  // export let dragHandle;
  // export let parentId;
  // export let type;
  // export let isConnectable;
  // export let positionAbsoluteX;
  // export let positionAbsoluteY;
  // export let width;
  // export let height;

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
  <Handle class="hndl" id="t" type="target" position={Position.Top} />
  <div class="container">
    <div style={parent_style}>
      <p use:fit>{data.msg}</p>
    </div>
  </div>
  <Handle class="hndl" id="b" type="source" position={Position.Bottom} />
  <Handle class="hndl" id="l" type="source" position={Position.Left} />
  <Handle class="hndl" id="r" type="source" position={Position.Right} />
</div>

<style>

  :global(.hndl) {
    visibility: hidden;
  }
  .endStep{
    padding: 10px;
    border-radius: 35px;
    background-color: black;
    color: white;
  }
  .step {
    padding: 5px;
    background: white;
    border: 1px solid #555;
    color: inherit;
    border-radius: 5px;
  }


  .container {
    position: relative;
    width: 150px;
    height: 50px;
    text-align: center;
  }

  /* This will extra zoom the small text and pull text up */
  /* p { 
    margin: 0;
  } */

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
