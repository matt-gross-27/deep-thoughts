import React from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
  const { username: userParam } = useParams();

  const {loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const { username, thoughts, friends, friendCount } = data?.user || {}

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {username}
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={thoughts} title={`${username} thoughts`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList username={username} friendCount={friendCount} friends={friends} /> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
