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
  import { toggleNodeCollapse, collapseAllChildren, expandAllChildren } from './ExpandCollapse.js';
  const nodeTypes = { step: StepNode };

  export let nodes = [];
  export let edges = [];
  export let nodeState = {};
  export let paths = [];
  export let nodesIndex = {};
  export let style = ""; // Accept style as a prop
  export let clazz = ""; // Accept class as a prop
  export let selection = [];
  export let focusOn = true;

  let highlighter = new Highlighter(nodes,edges, nodeState);
  let nodeStore = writable(nodes);
  let edgeStore = writable(edges);
  let selectionKey = -1;

  function highlightPath(event) {
    const node = event.detail.node;

    let seletedIndexes = null;
    if(selectionKey !== -1){
      switch(selectionKey){
        case 'a': //all
          seletedIndexes = getPathsPassingThrough(paths, node.data.index);
          break;
        case 'q': //steps after
          seletedIndexes = getStepsAfter(paths,node.data.index);
          break;
        case 'b': //steps before
          seletedIndexes = getStepsBefore(paths,node.data.index);
          break;
        case 'l': //longest
          seletedIndexes = getLongestPath(paths,node.data.index);
          break;
        case 's': //smallest
          seletedIndexes = getSmallestPath(paths,node.data.index);
          break;
      }
      highlighter.unselectAllNodes();
      highlighter.selectNodesByIndexes(new Set(seletedIndexes));
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
    // console.log(event.detail.edge)
    highlighter.toggleEdge(event.detail.edge.id)
    edgeStore.set(edges);
  }

  // Handle key events
  function handleKeyDown(event) {
    selectionKey = event.key;
  }

  function handleKeyUp(event) {
    selectionKey = -1;
  }

  // Handle node click
  function onNodeClick(event) {
    const node = event.detail.node;
    // console.log(node);
    if (node.data.type === "FOLLOW") {
      dispatch('flowChange', { flowName: node.data.msg });
    } else if (node.data.type === "IF" || node.data.type === "ELSE_IF" || node.data.type === "LOOP") {
      if(selectionKey === "]"){
        collapseAllChildren(nodes, edges, node, nodesIndex);
      }else if(selectionKey === "["){
        expandAllChildren(nodes, edges, node, nodesIndex);
      }else{
        toggleNodeCollapse(nodes, edges, node, nodesIndex);
      }
      updateStore(nodes,edges);
    }
  }



  // React to changes in selection
  $: highlighter.nodeState = nodeState;
  $: {
    if (selection && selection.nodeIds && selection.nodeIds.length > 0) {
      highlighter.unselectAllNodes();
      highlighter.selectNodes( new Set(selection.nodeIds));

      nodeStore.set(nodes);
    }else if (selection && selection.nodeIndexes && selection.nodeIndexes.length > 0) {
      highlighter.unselectAllNodes();
      highlighter.selectNodesByIndexes( new Set(selection.nodeIndexes));

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
    <ViewportAdjuster {selection} {nodes} {focusOn}/>
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