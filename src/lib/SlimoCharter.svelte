<script>
  import { writable } from 'svelte/store';
  import { 
    SvelteFlow, 
    Controls, 
    Background, 
    MiniMap, 
    SvelteFlowProvider, 
    MarkerType} from '@xyflow/svelte';
  
  import '@xyflow/svelte/dist/style.css';
  import StepNode from './Step.svelte';
  // export let containerId: string;
  
  const nodeTypes = { step: StepNode };
  
  // Accept nodes and edges from the parent
  export let nodes = [];
  export let edges = [];

  // Convert the arrays to writable stores
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
  // export let $$restProps;
</script>

<div {...$$restProps}>
  <SvelteFlowProvider>
    <SvelteFlow {nodeTypes} bind:nodes={nodeStore} bind:edges={edgeStore} fitView defaultEdgeOptions={{
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#FF4000' },
      style: 'stroke-width: 2px; stroke: #FF4000'
    }}>
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>
</div>