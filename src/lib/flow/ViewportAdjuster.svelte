<script>
  import {
    useSvelteFlow
  } from '@xyflow/svelte';

  let svelteFlowElement;
  export let selection;
  export let nodes;
  export let focusOn = true;

  function calculateBoundingBox(selectedNodeIds, nodes) {
    if (!selectedNodeIds || selectedNodeIds.length === 0) return null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedNodeIds.forEach((nodeId) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        const { x, y, width, height } = node;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
      }
    });

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  function fitViewToSelection(selectedNodeIds, nodes) {
    // const boundingBox = calculateBoundingBox(selectedNodeIds, nodes);
    // if (boundingBox) {
    if (selectedNodeIds.length > 0) {
      const nd = nodes.filter(node => selectedNodeIds.includes(node.id));
      // console.log(svelteFlowElement.getViewport())
      //TODO: Don't change view if node is already in the view
      svelteFlowElement.fitView({
        nodes: nd,
        maxZoom: 1,
        duration: 200,
        // includeHiddenNodes: true
      });
    }
  }

  $: {
    if (selection && selection.nodeIds && focusOn) {
      fitViewToSelection(selection.nodeIds, nodes);
    }
  }

  $: {
    svelteFlowElement = useSvelteFlow();
  }
</script>
