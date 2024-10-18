<script>
  import SlimoChart from '$lib/SlimoChart.svelte';
  
  // const branches = [ [1, 2, 3], [1, 2, 4, 5] ];
  let nodes = [
    { id: '1', type: 'step', position: { x: 0, y: 0 }, data: { msg: 'Node 1' } },
    { id: '2', type: 'step', position: { x: 100, y: 150 }, data: { msg: 'Node 2' } },
    { id: '3', type: 'step', position: { x: 200, y: 250 }, data: { msg: 'Node 3' } },
    { id: '4', type: 'step', position: { x: 300, y: 350 }, data: { msg: 'Node 4' } },
    { id: '5', type: 'step', position: { x: 400, y: 450 }, data: { msg: 'Node 5' } }
  ];

  let edges = [
    { id: '1-2', source: "1", target: "2" , type:"custom", data:{}},
    { id: '2-3', source: "2", target: "3" , type:"custom", data:{}},
    { id: '2-4', source: "2", target: "4" , type:"custom", data:{}},
    { id: '4-5', source: "4", target: "5" , type:"custom", data:{}}
  ];

  // const connections = { // loops or goto index is skipped from target if ...
  //   "1":{ source: [], target: [2]},
  //   "2":{ source: [1], target: [3,4]}, //edges: "1-3", "1-4"
  //   "3":{ source: [2], target: []},
  //   "4":{ source: [2], target: [5]},
  //   "5":{ source: [4], target: []},
  // }

</script>
  
<SlimoChart class="halfChart" nodes={nodes} edges={edges}/>  style working due to class

