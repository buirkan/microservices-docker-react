const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

// this object is where we're going to store every post
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // saving post
  posts[id] = {
    id,
    title
  };
  console.log(posts[id]);

  // status that we've just created a resource
  res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log('Listening on 4000'));