<script>
  import { writable } from 'svelte/store';
  import { onDestroy, createEventDispatcher } from 'svelte';
  import ViewportAdjuster from './ViewportAdjuster.svelte';

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

  let highlighter = new Highlighter(nodes,edges, nodeState);
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
  let selectDirection = -1;

  function highlightPath(event) {
    const nodeId = event.detail.node.id;
    // let selectDirection = -1;
    // if (keyPressed === 'Shift') selectDirection = 0;
    // else if (keyPressed === 'Control') selectDirection = 1;
    // else if (keyPressed === 'Alt') selectDirection = 2;

    if(selectDirection !== -1){
      const selection = traverseConnections(nodeId, connections, selectDirection);
      highlighter.unselectNodes();
      highlighter.selectPath(selection.seletedNodes, selection.seletedEdges);
      updateStore(nodes, edges);
    }
  }

  function unHighlightPath() {
    if(selectDirection !== -1){
      highlighter.unselectPath();
      updateStore(nodes, edges);
    }
  }

  function styleEdge(event) {
    highlighter.toggleEdge(event.detail.edge.id)
    edgeStore.set(edges);
  }

  // Handle key events
  function handleKeyDown(event) {
    if(event.ctrlKey && event.shiftKey) selectDirection = 2;
    else if(event.ctrlKey) selectDirection = 1;
    else if(event.shiftKey) selectDirection = 0;
  }

  function handleKeyUp(event) {
    selectDirection = -1;
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
  $: highlighter.nodeState = nodeState;
  $: {
    if (selection && selection.nodeIds) {
      highlighter.unselectAllNodes(); //any previous selected node
      highlighter.selectNodes( new Set(selection.nodeIds));

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
    <ViewportAdjuster bind:selection bind:nodes />
    <SvelteFlow
      {nodeTypes}
      bind:nodes={nodeStore}
      bind:edges={edgeStore}
      fitView
      defaultEdgeOptions={defaultEdgeOptions}
      on:nodemouseenter={highlightPath}
      on:nodemouseleave={unHighlightPath}
      on:nodeclick={onNodeClick}
      on:edgeclick={styleEdge}
    >
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </SvelteFlowProvider>
</div>