<script>
  import { toPng } from 'html-to-image';
  import { getNodesBounds, getViewportForBounds } from '@xyflow/svelte';
  import DownloadImg from "./icons/download-image.svelte"

  export let nodes=[];
  export let fileName = "";

  const imageWidth = 1024;
  const imageHeight = 768;

  function handleClick() {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      console.error('No nodes available to generate image.');
      return; // Exit if there are no nodes
    }
    const nodesBounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2.0, 0.2);

    const viewportDomNode = document.querySelector('.svelte-flow__viewport');

    if (viewport) {
      toPng(viewportDomNode, {
        // backgroundColor: '#1a365d', //to make it transparent
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
        }
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${fileName || ''}_solothought-flowchart.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  }
</script>

<!-- <Panel position="top-right"> -->
  <button {...$$restProps} on:click={handleClick} alt="save as image" placeholder="save chart as image"><DownloadImg /></button>
<!-- </Panel> -->