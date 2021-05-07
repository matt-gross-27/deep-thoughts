import React from 'react';

function ThoughtList({ thoughts, title }) {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      { thoughts &&
        thoughts.map(({ _id, username, thoughtText, createdAt, reactionCount }) => (
          <div key={_id} className="card mb-3">
            <p className="card-header">
              {username} thought on {createdAt}
            </p>
            <div className="card-body">
              <p>{thoughtText}</p>
              <p className="mb-0">
                Reactions: {reactionCount} || Click to {' '}
                {reactionCount ? 'see' : 'start'} the discussion!
              </p>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default ThoughtList;