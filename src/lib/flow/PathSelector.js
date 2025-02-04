
export function getPathsPassingThrough(paths, nodeIndex) {
  return paths
      .filter(path => path.includes(String(nodeIndex)))
      .flat(); // Flatten to return a single array of node IDs
}

export function getStepsBefore(paths, nodeId) {
  return paths
      .filter(path => path.includes(String(nodeId)))
      .flatMap(path => {
          let index = path.indexOf(String(nodeId));
          return index > 0 ? path.slice(0, index) : [];
      });
}

export function getStepsAfter(paths, nodeId) {
  return paths
      .filter(path => path.includes(String(nodeId)))
      .flatMap(path => {
          let index = path.indexOf(String(nodeId));
          return index !== -1 && index < path.length - 1 ? path.slice(index + 1) : [];
      });
}


export function getLongestPath(paths, nodeId) {
  let filteredPaths = paths.filter(path => path.includes(String(nodeId)));
  if (filteredPaths.length === 0) return [];

  let longestPath = filteredPaths.reduce((longest, current) =>
      current.length > longest.length ? current : longest
  );
  return longestPath;
}

export function getSmallestPath(paths, nodeId) {
  let filteredPaths = paths.filter(path => path.includes(String(nodeId)));
  if (filteredPaths.length === 0) return [];

  let smallestPath = filteredPaths.reduce((smallest, current) =>
      current.length < smallest.length ? current : smallest
  );
  return smallestPath;
}

