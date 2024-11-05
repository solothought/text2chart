<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { 
    SvelteFlow, 
    Controls, 
    Background, 
    MiniMap, 
    SvelteFlowProvider} from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';
  import StepNode from './Step.svelte';
  // import CustomEdge from './CustomEdge.svelte';
  import DownloadButton from './DownloadButton.svelte';
  import {convert} from './NodesAndEdgesBuilder.js';
  // import config from './config.js';

  import {highlight, 
    traverseConnections, 
    unhighlight, 
    edgeStyle, 
    edgeMarkerStyle, 
    // highlightedEdgeMarkerStyle, 
    unhighlightEdge, 
    updateEdgesStyle,
    highlightEdge} from './hoverManager.js';

  const nodeTypes = { step: StepNode };
  // const edgeTypes = { custom: CustomEdge };
  
  // Accept nodes and edges from the parent
  export let nodes = [];
  export let edges = [];
  export let text = "";
  export let flowName = "";
  // export let nodeSize = {width: 180, height:72};
  // config.nodeSize = nodeSize;

  // Convert the arrays to writable stores
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
  let keyPressed = "";
  /**
   * {
   *  "1":{ source: [], target: [2]},
   *  "2":{ source: [1], target: [3,4]}
   * }
   */
  let connections = {}; //an intermediate DataType for fast traversing when styling nodes/edges

  let hoveredPathNodes = new Set();
  let hoveredPathEdges = new Set();


  function onNodeMouseEnter(event){
    const nodeId = event.detail.node.id;
    let selectDirection = 2;
    if (keyPressed === 'Shift') selectDirection = 0;
    else if (keyPressed === 'Control') selectDirection = 1;
    const selection = traverseConnections(nodeId, connections, selectDirection);
    hoveredPathNodes = selection.seletedNodes;
    hoveredPathEdges = selection.seletedEdges;
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

  const selectedEdges = new Set();
  function styleEdge(event){
    const edgeId = event.detail.edge.id;
    if(selectedEdges.has(edgeId)){
      selectedEdges.delete(edgeId);
      updateEdgesStyle(edges,new Set([event.detail.edge.id]),unhighlightEdge);
    }else{
      selectedEdges.add(edgeId);
      updateEdgesStyle(edges,new Set([event.detail.edge.id]),highlightEdge);
    }
    edgeStore.set(edges);
  }
  
  function handleKeyDown(event){
    keyPressed = event.key;
  };
  function handleKeyUp(event){
    keyPressed = "";
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  });

  let slimoFlow = "";
  $: { 
    if(text.length > 0 && slimoFlow !== text){
      slimoFlow = text;
      const flowsData = convert(text);
      if(flowsData.length > 0){ //TODO: support multiple flows
        nodes = flowsData[0].nodes;
        edges = flowsData[0].edges;
        connections = flowsData[0].connections;
        flowName = flowsData[0].flowName;
      }
    }
    
    nodeStore.set(nodes);
    edgeStore.set(edges);

  }
</script>

<div {...$$restProps} > 
  <SvelteFlowProvider >
    <SvelteFlow {nodeTypes} 
    
    bind:nodes={nodeStore} bind:edges={edgeStore} fitView 
    defaultEdgeOptions={{
      type: 'smoothstep',
      markerEnd: edgeMarkerStyle,
      style: edgeStyle
    }} 
    on:nodemouseenter={onNodeMouseEnter}
    on:nodemouseleave={onNodeMouseLeave}
    on:edgeclick={styleEdge}
    >
      <div style="position: relative;">Flow: {flowName}</div>
      <DownloadButton nodes={nodes} fileName={flowName}/>
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>

</div>
