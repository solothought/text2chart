<script>
  import { Position, getSmoothStepPath } from '@xyflow/svelte';

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

  let edgePath, labelX, labelY;

  // function hoverin(){
  //   data = {
  //     ...data,
  //     highlight: true
  //   }
  // }
  // function hoverout(){
  //   data = {
  //     ...data,
  //     highlight: false
  //   }
  // }
  // const edges = useEdges();
  // if($edges){
  //   console.debug(edges)
  // }
$:  [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sourceX,
    sourceY: sourceY,
    sourcePosition: Position.Bottom,
    targetX: targetX,
    targetY: targetY,
    targetPosition: Position.Top
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
    class="{data.highlight ? "highlight" : "custom-edge"} hvr"
    marker-end="{data.highlight ? `url('#arrow')` : markerEnd}"
  />

</svg>
{ #if data.label }
<!-- <EdgeLabelRenderer>
  <div
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
    class="edge-label nodrag nopan"
  >
    {data.label}
  </div>
</EdgeLabelRenderer> -->
{/if}
<style>
  .hvr:hover{
    fill: none;
    stroke: red;
    stroke-width: 2px;
    /* pointer-events:all; */
  }
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
