Setting Width and Height

- **width**
- **height**

```html
<script>
  new FlowChart({ //style working
    target: document.getElementById("quarterChart1"),
    props: {
      text: text,
      width: "50vw",
      height: "80vh"
    }
  });
  new FlowChart({ //style working
    target: document.getElementById("quarterChart4"),
    props: {
      text: text,
    }
  });
</script>
<div id="quarterChart1"></div>
<div id="quarterChart4" width="50vw" height="100vh"></div>
```

- **text**: to pass algo text
- **selection**: to pass the list of nodes and flow index that has to be highlighted on the chart

```svelte
<script>
  import FlowChart from '$lib/flow/FlowChart.svelte';

  nodesToHighlight = {
    flowIndex: flowIndex, 
    nodeIds: [0,2,3]
  }
</script>
<FlowChart 
      style="padding-left:10px; width:65vw; height:100%" 
      bind:text={flowText} 
      bind:selection={nodesToHighlight}/>
```

- **flowsData**: `text` propery is translated to `flowsData`. Instead, user can pass `flowsData` directly. It is helpful when user is cachhing or managing nodes and edges for each flow.

- **toolbar**: to hide toolbar
- **minimap**: to hide minimap