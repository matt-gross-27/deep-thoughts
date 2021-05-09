import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME_ALL } from '../../utils/queries';

function ThoughtForm() {
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (e) => {
    if (e.target.value.length <= 280) {
      setThoughtText(e.target.value);
      setCharacterCount(e.target.value.length)
    }
  };

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        // read whats currently in cache
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
        // prepend newest thought to the front of the array
        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] }
        });
      } catch (err) {
        console.log(err)
      }

      const { me } = cache.readQuery({ query: QUERY_ME_ALL });
      cache.writeQuery({
        query: QUERY_ME_ALL,
        data: { me: {...me, thoughts: [addThought, ...me.thoughts]}}
      })
    }
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await addThought({
        variables: { thoughtText }
      });

      setThoughtText('');
      setCharacterCount(0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p className={`mt-4 mb-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a thought"
          className="form-input col-12 col-md-9"
          value={thoughtText}
          onChange={handleChange}
        ></textarea>
        <button className="btn col12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;