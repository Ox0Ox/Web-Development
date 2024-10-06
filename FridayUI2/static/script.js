



document.getElementById("sendBtn").addEventListener("click", function() {
    sendQuery();
});

// Event listener for the Enter key press in the input field
document.getElementById("userQuery").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendQuery();
    }
});

// Event listener for the Mic button
document.getElementById("micBtn").addEventListener("click", function() {
    startListening();

    fetch('/voice_command', {
        method: 'POST' // Changed from 'GET' to 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        stopRecognizing();
        document.getElementById("responseArea").innerHTML = "";
        var responseDiv = document.createElement("div");
        responseDiv.className = "response-item";
        responseDiv.innerText = data.response;
        document.getElementById("responseArea").appendChild(responseDiv);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("responseArea").innerText = "An error occurred: " + error.message;
        stopRecognizing();
    });
});

// Function to handle starting the listening state
function startListening() {
    console.log('Starting listening'); // Debug line
    var userQuery = document.getElementById("userQuery");
    setPlaceholderColor('blue');
    userQuery.value = "Listening...";
}

// Function to handle starting the recognizing state
function startRecognizing() {
    console.log('Starting recognizing'); // Debug line
    var userQuery = document.getElementById("userQuery");
    setPlaceholderColor('blue'); // Optional: Change color when recognizing
    userQuery.value = "Recognizing...";
}

// Function to handle stopping the recognizing state
function stopRecognizing() {
    console.log('Stopping recognizing'); // Debug line
    var userQuery = document.getElementById("userQuery");
    setPlaceholderColor('gray'); // Revert placeholder color to default
    userQuery.value = "";
}

// Function to set the placeholder color
function setPlaceholderColor(color) {
    document.documentElement.style.setProperty('--placeholder-color', color);
}

// Function to send the query to the server
function sendQuery() {
    var query = document.getElementById("userQuery").value;
    console.log('Sending query:', query); // Debug line

    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'query=' + encodeURIComponent(query)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseArea").innerHTML = "";
        var responseDiv = document.createElement("div");
        responseDiv.className = "response-item";
        responseDiv.innerText = data.response;
        document.getElementById("responseArea").appendChild(responseDiv);
        document.getElementById("userQuery").value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("responseArea").innerText = "An error occurred: " + error.message;
    });
}
