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
  import CustomEdge from './CustomEdge.svelte';
  import DownloadButton from './DownloadButton.svelte';
  import {convert} from './NodesAndEdgesBuilder.js';

  import {highlight, traverseConnections, unhighlight} from './hoverManager.js';
  
  const nodeTypes = { step: StepNode };
  const edgeTypes = { custom: CustomEdge };
  
  // Accept nodes and edges from the parent
  export let nodes = [];
  export let edges = [];
  export let text = "";
  
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

  const hoveredPathNodes = new Set();
  const hoveredPathEdges = new Set();


  function onNodeMouseEnter(event){
    const nodeId = event.detail.node.id;
    traverseConnections(nodeId, connections,  hoveredPathNodes, hoveredPathEdges);
    highlight(nodes, edges, hoveredPathNodes,hoveredPathEdges);

    nodeStore.set(nodes);
    edgeStore.set(edges);
  }
  function onNodeMouseLeave(){
    unhighlight(nodes, edges, hoveredPathNodes,hoveredPathEdges);
    hoveredPathNodes.clear();
    hoveredPathEdges.clear();

    nodeStore.set(nodes);
    edgeStore.set(edges);
  }

  $: {
    if(text.length > 0){
      const data = convert(text);
      nodes = data.nodes;
      edges = data.edges;

      // console.log(nodes);
      // console.log(edges);
    }
    buildConnections();
    
    nodeStore.set(nodes);
    edgeStore.set(edges);
  }
</script>

<div {...$$restProps} >
  <SvelteFlowProvider >
    <SvelteFlow {nodeTypes} {edgeTypes} bind:nodes={nodeStore} bind:edges={edgeStore} fitView defaultEdgeOptions={{
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#cac2c2' },
      // style: 'stroke-width: 2px; stroke: #FF4000'
    }} 
    on:nodemouseenter={onNodeMouseEnter}
    on:nodemouseleave={onNodeMouseLeave}
    >
      <DownloadButton {nodes} />
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>

</div>