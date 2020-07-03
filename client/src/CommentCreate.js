import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');

  const createComment = async (event) => {
    event.preventDefault();
    // request to post service
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
    setContent('');
  };

  return (
    <div>
      <form className="form-group" onSubmit={createComment}>
        <label>New Comment</label>
        <input className="form-control" onChange={(e) => setContent(e.target.value)} />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};