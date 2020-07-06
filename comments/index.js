const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  // get comments if post already have any
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  console.log(comments);

  // emit event to event bus
  await axios.post('http://localhost:4005/events', {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId
    }
  });

  // created a resource of comments on a post id
  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log(`Received event: ${req.body.type}`);

  res.send({ status: 'Event received OK' });
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});