import React from 'react';
import { Link } from 'react-router-dom';

function FriendList({ friendCount, username, friends }) {
  if (!friends || !friends.length) {

    return (
      <>
        <h3>
          Friends
        </h3>
        <p className="bg-dark text-light p-3">{username} is a lone wolf</p>
      </>
    )
  }

  return (
    <div>
      <h3>
        {friendCount} {friendCount === 1 ? 'Friend' : 'Friends'}
      </h3>
      {
        friends.map(friend => (
          <button className="btn w-100 display-block mb-2" key={friend._id}>
            <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
          </button>
        ))
      }
    </div>
  );
};

export default FriendList;