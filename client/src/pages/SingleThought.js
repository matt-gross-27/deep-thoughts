import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHT } from '../utils/queries';
import Loading from '../components/Loading';
import ReactionList from '../components/ReactionList';
import { Link } from 'react-router-dom'

const SingleThought = props => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const { username, createdAt, thoughtText, reactions, reactionCount } = data?.thought || {}

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            <Link to={`/profile/${username}`} style={{ fontWeight: 700 }}>
              {username}
            </Link>
          </span>{' '}
          thought on {createdAt}
        </p>
        <div className="card-body">
          <p>{thoughtText}</p>
        </div>
      </div>

      {reactionCount > 0 && <ReactionList reactions={reactions} />}
    </div>
  );
};

export default SingleThought;
