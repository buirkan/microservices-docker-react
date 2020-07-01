import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [title, setTitle] = useState('');

  const onFormSubmit = async event => {
    event.preventDefault();

    // request to out posts service
    await axios.post('http://localhost:4000', { title });

    // UX on input cleaning title value
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          {/* two way property binding */}
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};