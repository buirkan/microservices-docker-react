const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// data structure in a object containing all the posts and the comments by post
const posts = {};

/**
 * Helper method to handle a event by type and reuse though lifecycle of query service
 * 
 * @type type of event
 * @data content of event data
 */
const handleEvent = (type, data) => {
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
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

// receive events from event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
  const res = axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log(`Processing event ${event.type}`);
    handleEvent(event.type, event.data);
  }
});