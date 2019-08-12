// implement your API here
const express = require('express');
const cors = require('cors');
const Hubs = require('./data/db');

const server = express();
server.use(express.json());  //Note-to-self: dont forget to invoke .json()
server.use(cors());  //enabling cors middleware

server.get('/', (req, res) => {
  res.send('hello web 20.75');  //send back a string, can also send back html elements
})

//Endpoint to get all users in the database
server.get('/users', (req, res) => {
  Hubs.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({message: 'The users information could not be retrieved'})
    })
})

//Endpoint to get user object with specific id
server.get('/users/:id', (req, res) => {
  let userId = req.params.id; 
  Hubs.findById(userId)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({message: 'The user with the specified ID does not exist'})
      }
    })
    .catch(error => {
      res.status(500).json({error: 'The user information could not be retrieved'})
    })
})

//Endpoint to create a user
server.post('/users', (req, res) => {
  let user = req.body;
  if (!user.name || !user.bio) {
    res.status(404).json({errorMessage: "Please provide name and bio for the user"});
  } else {
    Hubs.insert(user)
      .then(response => {
        res.status(201).json(response);     
      })
      .catch(error => {
        res.status(500).json({error: 'There was an error while saving the user to the database'})
      })
  }
})

//Endpoint to delete an user
server.delete('/users/:id', (req, res) => {
  let userId = req.params.id;
  Hubs.remove(userId)
    .then(response => {
      if (response) {
        res.status(200).json({message: "The user was deleted successfully"});
      } else {
        res.status(400).json({message: "The user with the specified ID does not exist"});
      }
    })
    .catch(error => {
      res.status(500).json({error: 'The user could not be removed'});
    })
})

//Endpoint to edit an user
server.put('/users/:id', (req, res) => {
  let userId = req.params.id;
  let user = req.body;
  if (!user.name || !user.bio) {
    res.status(404).json({errorMessage: "Please provide name and bio for the user"});
  } else {
  Hubs.update(userId, user)
    .then(response => {
      if (response) {
        res.status(200).json({message: "The user was updated successfully"});
      } else {
        res.status(400).json({message: "The user with the specified ID does not exist"});
      }
    })
    .catch(error => {
      res.status(500).json({error: 'The user information could not be modified'});
    })
  }
})

const port = 8000;
server.listen(port, () => console.log('listening on port ' + port))