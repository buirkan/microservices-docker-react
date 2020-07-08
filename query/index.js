const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// data structure in a object containing all the posts and the comments by post
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

// receive events from event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    // default empty array of comments on creation event of a post
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = post[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);

    comment.status = status;
    comment.content = content;
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => console.log('Listening on 4002'));