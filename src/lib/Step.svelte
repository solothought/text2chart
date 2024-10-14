<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { fit, parent_style } from '@leveluptuts/svelte-fit';

  import { hoverId } from './stores.js'; // Import shared store
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
  let hovered = false;

  const handleMouseEnter = () => {
      hovered = true;
      hoverId.set(id);
   };

   const handleMouseLeave = () => {
      hovered = false;
      hoverId.set(null);
   };
</script>

<div class="step {data.highlight ? 'hovered' : ''}" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
  <Handle id="t" type="target" position={Position.Top} />
  <div class="container">
    <div style={parent_style}>
      <p use:fit>{data.msg}</p>
    </div>
  </div>
  <Handle id="b" type="source" position={Position.Bottom} />
</div>

<style>
  .step {
    padding: 10px;
    background: white;
    border: 1px solid #555;
    border-radius: 3px;
  }

  .container {
    height: 30px;
    max-width: 150px;
    text-align: center;
  }
  .hovered {
      border: 2px solid #FF4000;
      background-color: lightgrey;
   }
</style>
