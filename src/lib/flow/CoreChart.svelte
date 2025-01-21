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

  import {traverseConnections } from './hoverManager.js';

  import {Highlighter, defaultEdgeOptions} from './Highlighter.js';
  const nodeTypes = { step: StepNode };

  export let nodes = [];
  export let edges = [];
  export let nodeState = {};
  export let connections = {};
  export let style = ""; // Accept style as a prop
  export let clazz = ""; // Accept class as a prop
  export let selection = [];
  let highlighter = new Highlighter(nodes,edges);

  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
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

    // highlight(nodes, hoveredPathNodes, nodeState, edges, hoveredPathEdges);
    highlighter.selectPath(selection.seletedNodes, nodeState, selection.seletedEdges);
    updateStore(nodes, edges);
  }

  /**
   * unHighlight Path
   */
  function onNodeMouseLeave() {
    highlighter.unselectPath(nodeState);
    updateStore(nodes, edges);
  }

  // Handle edge click
  function styleEdge(event) {
    highlighter.toggleEdge(event.detail.edge.id)
    edgeStore.set(edges);
  }

  // Handle key events
  function handleKeyDown(event) {
    keyPressed = event.key;
  }

  function handleKeyUp() {
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
  $: {
    if (selection && selection.nodeIds) {
      highlighter.unselectNodes(nodeState);
      highlighter.selectNodes( new Set(selection.nodeIds), nodeState);

      nodeStore.set(nodes);
    }
  }

  export function updateStore(nodes, edges){
    highlighter.update(nodes, edges);
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
      defaultEdgeOptions={defaultEdgeOptions}
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