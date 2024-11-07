<script>
  import { Handle, Position} from '@xyflow/svelte';
  import { fit, parent_style } from '@leveluptuts/svelte-fit'
  // import './step.css';
  export let data;
</script>
 
<div class="step">
  <Handle id="t" type="target" position={Position.Top} />
  <div class="container">

    <!-- Parent Wrapping Div -->
    <div style={parent_style}>
      <!-- {data.isStart ? 'Yes' : 'No'} -->
      <p  use:fit>{data.msg}</p>
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
</style>