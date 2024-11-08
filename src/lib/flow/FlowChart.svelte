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
  import DownloadButton from './../DownloadButton.svelte';
  import {convert as flowText2Obj} from './NodesAndEdgesBuilder.js';
  import {updateProperty} from './nodeUpdater.js';

  import {highlight, 
    traverseConnections, 
    unhighlight, 
    edgeStyle, 
    edgeMarkerStyle, 
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
  export let selection = [];

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

  let flowsData = []; // All flows parsed from text
  let selectedFlowIndex = 0; // Track selected flow, defaulting to the first
  let hoveredState = false;
  let nodeConfig = {
    hideMsgDetail: false,
    standardShape: false
  }

  function onNodeMouseEnter(event){
    hoveredState = true;
    const nodeId = event.detail.node.id;
    let selectDirection = 2;
    if (keyPressed === 'Shift') selectDirection = 0;
    else if (keyPressed === 'Control') selectDirection = 1;
    const selection = traverseConnections(nodeId, connections, selectDirection);
    hoveredPathNodes = selection.seletedNodes;
    hoveredPathEdges = selection.seletedEdges;
    highlight(nodes, hoveredPathNodes, nodeConfig, edges,hoveredPathEdges);

    nodeStore.set(nodes);
    edgeStore.set(edges);
  }
  function onNodeMouseLeave(){
    hoveredState=false;
    unhighlight(nodes, hoveredPathNodes, nodeConfig, edges, hoveredPathEdges);
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
  function hideNodeMsgDetail(){
    nodeConfig.hideMsgDetail = !nodeConfig.hideMsgDetail;
    updateProperty(nodes,nodeConfig);
    nodeStore.set(nodes);
  }
   // Update flow data when user selects a different flow
  function handleFlowChange(event) {
    updateSelectedFlow(parseInt(event.target.value));
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  });

  let slimoFlow = "";
  $: { 
    if (text.length > 0) {
      flowsData = flowText2Obj(text);
      updateSelectedFlow(selectedFlowIndex); // Set first flow by default
    }
  }

  function updateSelectedFlow(index) {
    selectedFlowIndex = index;
    if (flowsData[selectedFlowIndex]) {
      const selectedFlow = flowsData[selectedFlowIndex];
      nodes = selectedFlow.nodes;
      edges = selectedFlow.edges;
      connections = selectedFlow.connections;
      flowName = selectedFlow.flowName;
      updateProperty(nodes,nodeConfig);
      nodeStore.set(nodes);
      edgeStore.set(edges);
    }
  }
let selected = {}; //{flowIndex:number,nodeIds:string[]}
$: {
  if(selection && selection.nodeIds && selection.nodeIds.length){ //TODO: accept flow number. Ignore if selected flow is different 
    // console.log(selection, selected);
    unhighlight(nodes,new Set(selected.nodeIds), nodeConfig);
    if(selection.flowIndex === selectedFlowIndex){

      nodeStore.set(nodes);
      selected = selection;
      highlight(nodes,new Set(selection.nodeIds),nodeConfig);
      nodeStore.set(nodes);

    }
  }
}
</script>

<div {...$$restProps} id="solothought-flow" > 
  <SvelteFlowProvider >
    <div class="toolbar">
      <!-- Flow Selector -->
      <select class="st-flow-chart-tool" on:change={handleFlowChange} bind:value={selectedFlowIndex}>
        {#each flowsData as flow, index}
          <option value={index} >{flow.flowName}</option>
        {/each}
      </select>
      <span on:click={hideNodeMsgDetail} class='st-flow-chart-tool {nodeConfig.hideMsgDetail ? 'toggled' : ''}'>👁</span>
      <DownloadButton class="st-flow-chart-tool" nodes={nodes} fileName={flowName}/>
    </div>
    <SvelteFlow  {nodeTypes}
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
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>

</div>
<style>
  .toggled{
    opacity: 50%;
  }
  .toolbar{
    height: 36px;
  }
  :global(.st-flow-chart-tool){
    padding: 5px;
    cursor: pointer;
  }
  :global(.st-flow-chart-tool:hover){
    outline: 1px dashed black;
  }
</style>