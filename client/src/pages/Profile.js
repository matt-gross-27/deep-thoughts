import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME_ALL } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';

import Loading from '../components/Loading';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';


const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME_ALL, {
    variables: { username: userParam }
  });

  const { _id, username, thoughts, friends, friendCount } = data?.me || data?.user || {}

  if (Auth.isLoggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!username && !userParam) {
    return (
      <h4 className="mb-4">You need to be logged in to see this page. Use the navigation links above to sign up or log in</h4>
    )
  }

  if (!username) {
    return (
      <h4 className="mb-4">
        Sorry no user named {' '}
        <span style={{ color: "var(--secondary)", textShadow: "1px 1px 1px var(--primary)" }}>
          {userParam}
        </span>
      </h4>
    )
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: _id }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3 bg-dark">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {username}
        </h2>
        {userParam && (
          <button className="btn ml-auto mr-3 my-3" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="mb-3">
        {!userParam && <ThoughtForm />}
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
