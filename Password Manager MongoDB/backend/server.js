const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const WebSocket = require('ws');
const { MongoClient, ObjectId } = require('mongodb');


dotenv.config();

// MongoDB connection
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const port = 4000;

const app = express();
app.use(bodyparser.json());
app.use(cors());

client.connect();
const db = client.db(dbName);

// WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Notify all connected clients about password updates
const notifyClients = async () => {
    const collection = db.collection('passwords');
    const passwords = await collection.find({}).toArray();

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(passwords));
        }
    });
};

// Get all passwords
app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Save Password
app.post('/', async (req, res) => {
  const password = req.body;
  const collection = db.collection('passwords');
  try {
      await collection.insertOne(password);
      notifyClients(); // Notify clients about the new password
      res.status(201).send({ success: true });
  } catch (error) {
      console.error('Failed to save credentials:', error);
      res.status(500).send({ success: false, error: 'Failed to save credentials' });
  }
});


// Delete Password
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const collection = db.collection('passwords');
  try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
          notifyClients(); // Notify clients about the deletion
          res.send({ success: true });
      } else {
          res.status(404).send({ success: false, error: 'Password not found' });
      }
  } catch (error) {
      console.error('Failed to delete credential:', error);
      res.status(500).send({ success: false, error: 'Failed to delete credential' });
  }
});

// Update Password
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPassword = req.body;
  const collection = db.collection('passwords');

  // Remove _id from the update payload
  const { _id, ...updateFields } = updatedPassword;

  try {
      const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateFields }
      );
      if (result.matchedCount === 1) {
          notifyClients(); // Notify clients about the update
          res.send({ success: true });
      } else {
          res.status(404).send({ success: false, error: 'Password not found' });
      }
  } catch (error) {
      console.error('Failed to update credential:', error);
      res.status(500).send({ success: false, error: 'Failed to update credential' });
  }
});





// Integrate WebSocket server with HTTP server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
