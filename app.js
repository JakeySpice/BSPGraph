const express = require('express');
const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Graph data
let graphData = {
    nodes: [],
    relationships: []
};

let nodeIdCounter = 0;
let relationshipIdCounter = 0;

// Routes
app.post('/nodes', createNode);
app.post('/relationships', createRelationship);
app.get('/data', getData);
app.post('/save', saveData);
app.post('/clear', clearData);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to get the current graph data
function getData(req, res) {
    res.json(graphData);
}

// Function to create a new node
function createNode(req, res) {
    const { nodeLabel } = req.body;
    console.log(nodeLabel);
    console.log("createNode function called");
    // Create a new node object with the given type
    const newNode = {
        id: generateNodeId(),
        label: nodeLabel
    };

    // Add the node to the local array or object
    graphData.nodes.push(newNode);

     // Create relationships between the new node and existing nodes with lower IDs
     for (let i = 0; i < graphData.nodes.length - 1; i++) {
        const existingNode = graphData.nodes[i];
        const newRelationship = {
            id: generateRelationshipId(),
            from: existingNode.id,
            to: newNode.id,
            label: 'related'
        };
        graphData.relationships.push(newRelationship);
    }

    res.sendStatus(200);
}
// Function to generate a unique ID for a node
function generateNodeId() {
    // Generate and return a unique identifier for the node
    // You can use a library like 'uuid' or implement your own logic
    // Example using a simple counter
    console.log(nodeIdCounter);

    return `node-${++nodeIdCounter}`;
    
}
// Function to create a new relationship
function createRelationship(req, res) {
    const { sourceNodeId, targetNodeId, relationshipType } = req.body;
    // Create a new relationship object with the given source, target, and type
    // Add the relationship to a local array or object
    res.sendStatus(200);
}

// Function to generate a unique ID for a relationship
function generateRelationshipId() {
    return `relationship-${++relationshipIdCounter}`;
}

// Function to get the current graph data
function getData(req, res) {
    // Retrieve the current state of the graph from the local arrays or objects
    // Send the data as a JSON response
    res.json(graphData);
}

// Function to save the graph data
function saveData(req, res) {
    // Generate Neo4j compatible format (e.g., Cypher queries) for the nodes and relationships
    // Save the generated format to a file or database
    res.sendStatus(200);
}
// Function to clear the graph data
function clearData(req, res) {
    // Reset the graphData object
    graphData = {
        nodes: [],
        relationships: []
    };
    res.sendStatus(200);
}