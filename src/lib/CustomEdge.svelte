<script>
  import { Position, getSmoothStepPath, BaseEdge } from '@xyflow/svelte';

  // export let target;
  // export let source;
  export let sourceX;
  export let sourceY;
  // export let sourcePosition;
  export let targetX;
  export let targetY;
  // export let targetPosition;
  export let markerEnd;
  export let data= { highlight: false};

  let edgePath;

$: [edgePath] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: Position.Bottom,
    targetX: targetX,
    targetY: targetY,
    targetPosition: Position.Top,
  });

</script>

<svg>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="2.5" orient="auto">
      <polygon points="0 0, 10 2.5, 0 5" class="marker-color" />
    </marker>
  </defs>

  <path 
    d={edgePath} 
    class="{data.highlight ? "highlight" : "custom-edge"}"

    marker-end="{data.highlight ? `url('#arrow')` : markerEnd}"
  />
</svg>

<style>
  .custom-edge {
    fill: none;
    stroke-width: 2px;
    stroke: #cac2c2;
  }

  .highlight {
    fill: none;
    stroke: red;
    stroke-width: 2px;
  }

  .marker-color{
    fill: red;
  }
</style>
