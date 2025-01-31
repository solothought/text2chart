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

  import {
    getPathsPassingThrough,
    getStepsBefore,
    getStepsAfter,
    getSmallestPath,
    getLongestPath
   } from './PathSelector.js';

  import {Highlighter, defaultEdgeOptions} from './Highlighter.js';
  const nodeTypes = { step: StepNode };

  export let nodes = [];
  export let edges = [];
  export let nodeState = {};
  export let paths = [];
  export let style = ""; // Accept style as a prop
  export let clazz = ""; // Accept class as a prop
  export let selection = [];

  let highlighter = new Highlighter(nodes,edges, nodeState);
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
  let selectionKey = -1;

  function highlightPath(event) {
    const nodeId = event.detail.node.id;

    let seletedNodeIds = null;
    if(selectionKey !== -1){
      switch(selectionKey){
        case 1:
          seletedNodeIds = getPathsPassingThrough(paths,nodeId);
          break;
        case 2:
          seletedNodeIds = getStepsAfter(paths,nodeId);
          break;
        case 3:
          seletedNodeIds = getStepsBefore(paths,nodeId);
          break;
        case 4:
          seletedNodeIds = getLongestPath(paths,nodeId);
          break;
        case 5:
          seletedNodeIds = getSmallestPath(paths,nodeId);
          break;
      }
      highlighter.unselectAllNodes();
      highlighter.selectNodes(new Set(seletedNodeIds));
      nodeStore.set(nodes)
    }
  }

  function unHighlightPath() {
    if(selectionKey !== -1){
      highlighter.unselectAllNodes();
      nodeStore.set(nodes);
    }
  }

  function styleEdge(event) {
    highlighter.toggleEdge(event.detail.edge.id)
    edgeStore.set(edges);
  }

  // Handle key events
  function handleKeyDown(event) {
    if(event.key === "a") selectionKey = 1; //all
    else if(event.key === "q") selectionKey = 2; //steps after
    else if(event.key === "b") selectionKey = 3; //steps before
    else if(event.key === "l") selectionKey = 4; //longest
    else if(event.key === "s") selectionKey = 5; //smallest
  }

  function handleKeyUp(event) {
    selectionKey = -1;
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
      highlighter.unselectAllNodes();
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