import React from 'react';
import { Link } from 'react-router-dom';

function ReactionList({ reactions }) {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reactions</span>
      </div>
      <div className="card-body">
        { reactions && 
        reactions.map(({ _id, username, createdAt, reactionBody }) => (
          <p className="pill mb-3" key={_id}>
            {reactionBody} {'// '}
            <Link to={`/profile/${username}`} style={{ fontWeight: 700 }}>
              {username}
            </Link>
            {' '} on {createdAt}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ReactionList;