<script>
  import SlimoChart from '$lib/SlimoChart.svelte';
    import { Position } from '@xyflow/svelte';
  
  // Initialize nodes and edges
  const flowText = `
FLOW: passed as parameter
here you go
IF go in loop
  LOOP until
    you're safe here even with a long sentence
    IF not
      but
    ELSE_IF else if
      STOP
    ELSE
      SKIP
finsh here
      ` 
const nodes =[
  {
    id: '1',
    type: 'step',
    data: { msg: 'here you go', type: '', isStart: true },
    position: { x: 50, y: 50 }
  },
  {
    id: '2',
    type: 'step',
    data: { msg: 'go in loop', type: 'IF' },
    position: { x: 200, y: 200 }
  },
  {
    id: '3',
    type: 'step',
    data: { msg: 'until', type: 'LOOP' },
    position: { x: 200, y: 300 }
  },
  {
    id: '4',
    type: 'step',
    data: { msg: "you're safe here even with a long sentence", type: '' },
    position: { x: 200, y: 400 }
  },
  {
    id: '5',
    type: 'step',
    data: { msg: 'not', type: 'IF' },
    position: { x: 200, y: 500 }
  },
  {
    id: '6',
    type: 'step',
    data: { msg: 'but', type: '' },
    position: { x: 200, y: 600 }
  },
  {
    id: '7',
    type: 'step',
    data: { msg: 'this', type: 'ELSE_IF', isEnd: true },
    position: { x: 400, y: 700 }
  },
  {
    id: '11',
    type: 'step',
    data: { msg: 'finsh here', type: '', isEnd: true },
    position: { x: 400, y: 500 }
  }
];
const edges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    label: '',
    // type: 'custom',
    data: { }
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '3-4',
    source: '3',
    target: '4',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '4-5',
    source: '4',
    target: '5',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '5-6',
    source: '5',
    target: '6',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '6-3',
    source: '6',
    target: '3',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '5-7',
    source: '5',
    target: '7',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '7-3',
    source: '7',
    target: '3',
    label: '',
    // type: 'custom',
    data: { },
  },
  {
    id: '3-11',
    source: '3',
    target: '11',
    label: '',
    // type: 'custom',
    data: { }
  },
  {
    id: '2-11',
    source: '2',
    target: '11',
    label: '',
    // type: 'custom',
    data: { label: "OUT"},
  }
]
;

</script>
  
<SlimoChart style="width:100vw; height:100vh" text={flowText} />
<!-- <SlimoChart style="width:100vw; height:100vh" bind:initialNodes={nodes} bind:initialEdges={edges} /> -->

<!-- <SlimoChart >
  FLOW: in tag
  here you go
  LOOP until
    you're safe here
    IF not
      STOP
    ELSE
      SKIP
</SlimoChart> -->