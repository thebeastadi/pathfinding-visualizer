import { Graph } from './graph';
import { PriorityQueue } from './priorityQueue';
import * as GraphTypes from './graphTypes';

export const dijkstra = (
	graph: Graph,
	start: number,
	end: number
): GraphTypes.PathfindingAnimation[] => {
	let nodes = new PriorityQueue(graph.numRows, graph.numCols);
	let previous: GraphTypes.Previous = {};
	let distances: GraphTypes.Distances = {};
	let path: number[] = [];
	let pathfindingAnimation: GraphTypes.PathfindingAnimation[] = [];

	nodes.enqueue(start, 0);
	previous[start] = NaN;
	distances[start] = 0;

	while (nodes.values.length) {
		let current = nodes.dequeue();

		pathfindingAnimation.push({
			index: current.node,
			state: 'VISITING',
		});

		if (current.node === end) {
			let currentNode = current.node;
			while (previous[currentNode]) {
				path.push(currentNode);
				currentNode = previous[currentNode];
			}
			path.push(start);
			path.reverse();

			for (let i = 0; i < path.length; i++) {
				pathfindingAnimation.push({
					index: path[i],
					state: 'PATH',
				});
			}

			pathfindingAnimation.push({
				index: 0,
				state: 'DONE',
			});

			break;
		}

		for (let neighbor of graph.adjacencyList[current.node]) {
			let newCost = distances[current.node] + neighbor.weight;

			if (
				!(neighbor.node in distances) ||
				newCost < distances[neighbor.node]
			) {
				distances[neighbor.node] = newCost;
				nodes.enqueue(neighbor.node, newCost);
				previous[neighbor.node] = current.node;
			}
		}

		// let currentNodes = [...nodes.values];
		// console.log(currentNodes);
	}

	return pathfindingAnimation;
};
