import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REACTION } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';

import { QUERY_THOUGHT } from '../../utils/queries';

function ReactionFrom({ thoughtId }) {
  const [reactionBody, setReactionBody] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    if (e.target.value.length <= 280) {
      setReactionBody(e.target.value)
      setCharCount(e.target.value.length)
    }
  };

  const [addReaction, { error }] = useMutation(ADD_REACTION, {
    refetchQueries: [{
      query: QUERY_THOUGHT,
      variables: { id: thoughtId }
    }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId }
      });

      setReactionBody('');
      setCharCount(0);
      // // replace this with cache hook
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p className={`m-0 ${error || charCount === 280 ? 'text-error' : ''}`}>
        Character Count: {charCount}/280
        {error && <span>{' '}Something went wrong</span>}
      </p>
      <form onSubmit={handleSubmit} className="flex-row justify-center justify-space-between-md align-stretch mb-4">
        <textarea
          placeholder="Leave a reaction"
          className="form-input col-12 col-md-9"
          value={reactionBody}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn col-12 col-md-3">
          Submit
        </button>
      </form>

    </div>
  )
}

export default ReactionFrom;