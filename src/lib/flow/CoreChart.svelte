<script>
  import { writable } from 'svelte/store';
  import { onDestroy, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import {
    SvelteFlow,
    Controls,
    Background,
    MiniMap,
    SvelteFlowProvider
  } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import StepNode from './Step.svelte';

  import {
    highlight,
    traverseConnections,
    unhighlight,
    edgeStyle,
    edgeMarkerStyle,
    unhighlightEdge,
    updateEdgesStyle,
    highlightEdge
  } from './hoverManager.js';

  const nodeTypes = { step: StepNode };

  export let nodes = [];
  export let edges = [];
  export let nodeState = {};
  export let connections = {};
  export let style = ""; // Accept style as a prop
  export let clazz = ""; // Accept class as a prop
  export let selection = [];

  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);

  let hoveredPathNodes = new Set();
  let hoveredPathEdges = new Set();
  let keyPressed = "";

  
  /**
   * Highlight Path based on key pressed
   * @param event
   */
  function onNodeMouseEnter(event) {
    const nodeId = event.detail.node.id;
    let selectDirection = 2;
    if (keyPressed === 'Shift') selectDirection = 0;
    else if (keyPressed === 'Control') selectDirection = 1;

    const selection = traverseConnections(nodeId, connections, selectDirection);
    hoveredPathNodes = selection.seletedNodes;
    hoveredPathEdges = selection.seletedEdges;

    highlight(nodes, hoveredPathNodes, nodeState, edges, hoveredPathEdges);

    updateStore(nodes, edges);
  }

  /**
   * unHighlight Path
   */
  function onNodeMouseLeave() {
    unhighlight(nodes, hoveredPathNodes, nodeState, edges, hoveredPathEdges);
    hoveredPathNodes.clear();
    hoveredPathEdges.clear();

    updateStore(nodes, edges);
  }

  // Handle edge click
  const selectedEdges = new Set();
  function styleEdge(event) {
    const edgeId = event.detail.edge.id;
    if (selectedEdges.has(edgeId)) {
      selectedEdges.delete(edgeId);
      updateEdgesStyle(edges, new Set([edgeId]), unhighlightEdge);
    } else {
      selectedEdges.add(edgeId);
      updateEdgesStyle(edges, new Set([edgeId]), highlightEdge);
    }
    edgeStore.set(edges);
  }

  // Handle key events
  function handleKeyDown(event) {
    keyPressed = event.key;
  }

  function handleKeyUp(event) {
    keyPressed = "";
  }

  // Handle node click
  function onNodeClick(event) {
    const node = event.detail.node.data;
    if (node.type === "FOLLOW") {
      // Emit an event to change the flow
      dispatch('flowChange', { flowName: node.msg });
    }
  }

  // React to changes in selection
  let previouslySelectedNodes = {};
  $: {
    if (selection && selection.nodeIds) {
      if(previouslySelectedNodes.nodeIds)
        unhighlight(nodes, new Set(previouslySelectedNodes.nodeIds), nodeState);

      previouslySelectedNodes = selection; //update reference
      highlight(nodes, new Set(selection.nodeIds), nodeState);
      nodeStore.set(nodes);
    }
  }

  export function updateStore(nodes, edges){
    console.debug("updating store")
    nodeStore.set(nodes);
    edgeStore.set(edges);
  }

  // Clean up on component destruction
  onDestroy(() => {
    updateStore([],[]);
  });
</script>

<svelte:window on:keyup={handleKeyUp} on:keydown={handleKeyDown} />

<div {style} class={clazz}>
  <SvelteFlowProvider>
    <SvelteFlow
      {nodeTypes}
      bind:nodes={nodeStore}
      bind:edges={edgeStore}
      fitView
      defaultEdgeOptions={{
        type: 'smoothstep',
        markerEnd: edgeMarkerStyle,
        style: edgeStyle
      }}
      on:nodemouseenter={onNodeMouseEnter}
      on:nodemouseleave={onNodeMouseLeave}
      on:nodeclick={onNodeClick}
      on:edgeclick={styleEdge}

    >
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>
</div>