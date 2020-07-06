const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// this object is where we're going to store every post
 const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // saving post
  posts[id] = {
    id,
    title
  };
  console.log(posts[id]);

  // emit event to event bus
  await axios.post('http://localhost:4005/events', {
    type: "PostCreated",
    data: {
      id,
      title
    }
  });

  // status that we've just created a resource
  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(`Received event: ${req.body.type}`);
  
  res.send({ status: 'Event received OK'});
});

app.listen(4000, () => console.log('Listening on 4000'));