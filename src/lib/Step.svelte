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
  <Handle id="t" type="target" position={Position.Top} />
  <div class="container">
    <div style={parent_style}>
      <p use:fit>{data.msg}</p>
    </div>
  </div>
  <Handle id="b" type="source" position={Position.Bottom} />
  <Handle id="l" type="source" position={Position.Left} />
  <Handle id="r" type="source" position={Position.Right} />
</div>

<style>
  .endStep{
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    color: white;
  }
  .step {
    padding: 10px;
    background: white;
    border: 1px solid #555;
    color: inherit;
    border-radius: 3px;
  }


  .container {
    height: 50px;
    /* max-width: 150px; */
    width: 150px;
    text-align: center;
  }
  .hovered {
      border: 2px solid #FF4000;
      background-color: lightgrey;
      color: inherit;
   }
</style>
