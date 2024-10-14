<script>
  import { writable } from 'svelte/store';
  import { 
    SvelteFlow, 
    Controls, 
    Background, 
    MiniMap, 
    SvelteFlowProvider, 
    // getConnectedEdges, 
    // getIncomers, 
    // getOutgoers,
    MarkerType} from '@xyflow/svelte';
  
  import '@xyflow/svelte/dist/style.css';
  import StepNode from './Step.svelte';
  import CustomEdge from './CustomEdge.svelte';
  import DownloadButton from './DownloadButton.svelte';

  import {highlight, traverseConnections, unhighlight} from './hoverManager.js';
  
  const nodeTypes = { step: StepNode };
  const edgeTypes = { custom: CustomEdge };
  
  // Accept nodes and edges from the parent
  export let nodes = [];
  export let edges = [];
  

  // Convert the arrays to writable stores
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);

  /**
   * {
   *  "1":{ source: [], target: [2]},
   *  "2":{ source: [1], target: [3,4]}
   * }
   */
  let connections = [];

  function buildConnections() {
    nodes.forEach(node => {
      connections[node.id] = { source: [], target: [] };
    });

    edges.forEach(edge => {
      connections[edge.source].target.push(edge.target);
      connections[edge.target].source.push(edge.source);
    });
  }

  import { hoverId } from './stores.js'; // Import shared store
  const hoveredPathNodes = new Set();
  const hoveredPathEdges = new Set();

  hoverId.subscribe(nodeId => {
    if (nodeId) {
      // console.log("Current Hovered Node ID:", nodeId);
      traverseConnections(nodeId, connections,  hoveredPathNodes, hoveredPathEdges);
      highlight(nodes, edges, hoveredPathNodes,hoveredPathEdges);

    } else {
      // Reset highlighting when no node is hovered
      unhighlight(nodes, edges, hoveredPathNodes,hoveredPathEdges);
      hoveredPathNodes.clear();
      hoveredPathEdges.clear();
    }

    //to refresh the view
    nodeStore.set(nodes);
    edgeStore.set(edges);
  });

  $: {
    buildConnections(nodes, edges);
    // console.log(connections);
  }
</script>

<div {...$$restProps} >
  <SvelteFlowProvider >
    <SvelteFlow {nodeTypes} {edgeTypes} bind:nodes={nodeStore} bind:edges={edgeStore} fitView defaultEdgeOptions={{
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#cac2c2' },
      // style: 'stroke-width: 2px; stroke: #FF4000'
    }} 
    
    >
      <DownloadButton {nodes} />
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>
</div>