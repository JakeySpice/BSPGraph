// Function to handle form submission for adding a node
function addNode(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the value from the input field
    const nodeLabel = document.getElementById('user-input').value;

    // Create an object with the node data
    const nodeData = {
        nodeLabel: nodeLabel
        
    }; 
    
    // Send a POST request to the server to add the node
    fetch('/nodes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nodeData)
    })
        .then(response => {
            if (response.ok) {
                // Node added successfully
                console.log('Node added successfully');
                
                // Clear the input field
                document.getElementById('user-input').value = '';

                // Refresh the graph or perform any other necessary actions
                refreshGraph();
            } else {
                // Error adding node
                console.error('Error adding node');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to refresh the graph
function refreshGraph() {
    // Send a GET request to the server to fetch the updated graph data
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Update the graph visualization with the new data
            updateGraph(data);
        })
        .catch(error => {
            console.error('Error:', error);
            console.log(data);
        });
}

// Function to update the graph visualization
function updateGraph(graphData) {
    // Use vis.js library to update the graph
    const nodes = new vis.DataSet(graphData.nodes);
    const edges = new vis.DataSet(graphData.relationships);
    console.log(nodes);

    const container = document.getElementById('network');

    const data = {
        nodes: nodes,
        edges: edges,
    };

    const options = {
        // Specify graph options if needed
        nodes: {
            shape: 'dot',
            size: 50,
            font: {
                size: 14,
                color: '#000000',
                align: 'center', // Align the label in the center of the node
                vadjust: 0 // Adjust the vertical position of the label
            },
            borderWidth: 2
        },
        edges: {
            width: 2,
            color: { inherit: 'from' },
            smooth: {
                type: 'continuous'
            }
        },
        physics: {
            stabilization: true,
            barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
            }
        }
        
    };

    // Create a new Network instance if it doesn't exist, otherwise update the existing one
    if (container.network) {
        // If there are no nodes or relationships, destroy the network instance
        if (graphData.nodes.length === 0 && graphData.relationships.length === 0) {
            container.network.destroy();
            container.network = null;
        } else {
            container.network.setData(data);
            container.network.setOptions(options);
        }
    } else {
        container.network = new vis.Network(container, data, options);
    }
}
// Function to handle clearing the graph
function clearGraph(event) {
    event.preventDefault(); // Prevent the default form submission

    // Send a POST request to the server to clear the graph data
    fetch('/clear', {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                // Graph data cleared successfully
                console.log('Graph data cleared successfully');
                // Refresh the graph
                refreshGraph();
            } else {
                // Error clearing graph data
                console.error('Error clearing graph data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



// Attach event listener to the form submission
document.getElementById('node-form').addEventListener('submit', addNode);
// Attach event listener to the form submission for clearing the graph
document.getElementById('clear-form').addEventListener('submit', clearGraph);
console.log(document.getElementById('clear-form')); 