<script>
  import SlimoChart from '$lib/SlimoChart.svelte';
  
  // Initialize nodes and edges
  const flowText = `
FLOW: passed as parameter
here you go
LOOP until
  you're safe here
  IF not
    STOP
  ELSE
    SKIP
` 
const nodes =[
  {
    id: "1",
    type: 'step',
    data: { msg: 'here you go', type: '', isStart: true },
    position: { x: 50, y: 50 }
  },
  {
    id: "2",
    type: 'step',
    data: { msg: 'until', type: 'LOOP', isEnd: true },
    position: { x: 200, y: 150 }
  },
  {
    id: "3",
    type: 'step',
    data: { msg: "you're safe here", type: '' },
    position: { x: 300, y: 150 }
  },
  {
    id: "4",
    type: 'step',
    data: { msg: 'not', type: 'IF', isEnd: true },
    position: { x: 400, y: 150 }
  }
];
const edges = [
  {
    id: '1-2',
    source: "1",
    target: "2",
    label: '',
    data: {}
  },
  {
    id: '2-3',
    source: "2",
    target: "3",
    label: '',
    data: {}
  },
  {
    id: '3-4',
    source: "3",
    target: "4",
    label: '',
    data: {}
  },
  {
    id: '4-2',
    source: "4",
    target: "2",
    label: '',
    data: {}
  }
];

</script>
  
<SlimoChart id="quarterChart" text={flowText} />
<!-- <SlimoChart id="quarterChart" {nodes} {edges} /> -->

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

