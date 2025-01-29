# Text2Chart

With respect to all existing text-to-diagram libraries, `@solothought/text2chart` library shares a similar purpose: building diagrams from text. By using text-based inputs, you gain the advantage of version control, enabling you to track changes, integrate with approval cycles, and share diagrams without concerns about file size.

Our library adds a unique focus on interactivity, creating diagrams that remain manageable and navigable as they expand. Currently, we’re launching FlowChart and have plan to add more type of diagrams on your feedback and requests. Follow and bookmark our GitHub repository to stay updated on new diagrams and enhanced features.

Currently, this library only supports generating flow chart. 

Your support will help us innovating. <a href="https://github.com/sponsors/solothought/"> 
  <img src="https://raw.githubusercontent.com/NaturalIntelligence/ThankYouBackers/main/github_sponsor.png" width="180" />
</a>

---

Install
```
$ npm install @solothought/text2chart
```
choose as per your need
- Minified Browser bundle: 250kb
- Minified CJS module: 250kb
- Minified MJS module: 250kb
- Minified CSS: 20kb
- package size: 750kb
- unpack size: 2.5mb


Import
```
import { FlowChart } from '@solothought/text2chart';
import FlowChart from '@solothought/text2chart/flow';
import FlowChart from '@solothought/text2chart/FlowChart.svelte';
import '@solothought/text2chart/style.css';
```

Use
```
<script>
import FlowChart from '@solothought/text2chart/flow';
import '@solothought/text2chart/style.css';

  const text = `
    FLOW: passed as parameter
    here you go
    IF go in loop
      LOOP until
        you're safe here even with a long sentence
    finsh here`;

</script>
  
<FlowChart {text} />
```
or
```
import FlowChart from '@solothought/text2chart/FlowChart.svelte';
//...
new FlowChart({
  target: document.getElementById("chartEl"),
  props: {
    text: algoText,
  }
});
```
or
```
const FlowChart = require('@solothought/text2chart/flow');

new FlowChart({
  target: document.getElementById("chartEl"),
  props: {
    text: algoText,
  }
});
```

**Properties**
- `text`: This is an important property that contains your algorithm which is parsed and charted.
- `selection`: This is an object of `{flowIndex: number, nodeIds: number[]}` type. `flowIndex` is used to load the chart for a particular flow when multiple flows are given in input algorithm. `nodeIds` is used to highlight nodes of given Id.


## Interaction

By default, when you hover a node, it highlights the path passing from that node.
1. When You press <kbd>Shift</kbd> key then hover a node in chart, it highlights the path up to that node.
2. When You press <kbd>Ctrl</kbd> key then hover a node in chart, it highlights the path from that node.

## Syntax

The supported format can be found at [@solothought/text2obj](https://github.com/NaturalIntelligence/text2obj) which is used a core dependency for parsing text to intermediate object that helps to draw charts.  However, sample algorithm is given below for basic understanding.

```stflow
FLOW: Binary Search
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <= high 🤱
    THEN calculate mid ((low + high) / 2)
    IF array[mid] = target
      found target at mid
      END
    ELSE
      FOLLOW update boundaries
  ELSE
    ERR Target not found
    END

FLOW: update boundaries
IF array[mid] < target
  update low to mid + 1
ELSE
  update high to mid - 1
```

**Keywords**: 
- Branch Steps: "IF", "ELSE_IF", "ELSE", "LOOP"
- Leaving Steps: "GOTO", "SKIP", "STOP", "END"
- Normal Steps: "AND", "THEN", "BUT", "FOLLOW", "ERR"
- Other: "FLOW", "FOLLOW"

**Note**
- a step starting with no keyword is also a normal step
- you can have multiple flows in single file


# Demo

[Link](https://solothought.com/text2chart/flow)

Demo supports following interaction with the chart
1. When you click a particular step, select number of steps, or move cursor in the text area, relevant steps are highlighted in chart and the view is changed to those steps.
2. You can use a few shortcuts in text area to make it user friendly
  - <kbd>Ctrl</kbd>+<kbd>/</kbd> : Comment a step
3. You can add flows and they will be stored in browser memory.

![Text2Chart Flow: Binary Search](./static/sampleflow.png)