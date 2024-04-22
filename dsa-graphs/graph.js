class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // Remove the vertex from the graph's nodes property
    this.nodes.delete(vertex);

    // Update adjacency lists of all other vertices
    for (let node of this.nodes) {
      // Remove the removed vertex from the adjacent set of other vertices
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    // Helper function to perform DFS recursively
    function dfs(node) {
      if (!node) return;
      visited.add(node);
      result.push(node.value);
      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];

    // Add the start vertex to the visited set and the result array
    visited.add(start);
    result.push(start.value);

    // Continue BFS traversal while the queue is not empty
    while (queue.length > 0) {
      // Dequeue a vertex from the front of the queue
      const current = queue.shift();

      // Iterate over the adjacent vertices of the current vertex
      for (let neighbor of current.adjacent) {
        // If the neighbor vertex hasn't been visited, mark it as visited, add it to the result array, and enqueue it
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          result.push(neighbor.value);
          queue.push(neighbor);
        }
      }
    }

    // Return the array of visited node values
    return result;
  }
}

module.exports = { Graph, Node }