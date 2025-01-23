const binarySearch = `
FLOW: Binary Search Algorithm
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <=  high
    THEN calculate mid ((low + high) / 2)
    IF array[mid] = target
      found target at mid
      STOP
    ELSE_IF array[mid] < target
      update low to mid + 1
    ELSE
      update high to mid - 1
  ELSE
    ERR Target not found
    STOP
`;

const binarySearchMultipleFlows = `
FLOW: Binary Search
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <= high
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
`


let flows = [
  { 
    id: 1, 
    name: "Binary Search", 
    successPercentage: 93, 
    errors: 1,
    minExecutionTime: 300,
    avgExecutionTime: 634,
    maxExecutionTime: 1300
   },
  { id: 2, name: "Binary Search with Multiple Flows", successPercentage: 0 }
];

let flowsText = {
  1: binarySearch,
  2: binarySearchMultipleFlows
}

export {
  flows,
  flowsText
}
