import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const VOTE_POLL_MUTATION = gql`
  mutation VotePollMutation($pollId: ID!, $dificulty: Float!) {
    vote(pollId: $pollId, dificulty: $dificulty) {
      id
      dificulty
      poll {
        description
      }
    }
  }
`;

const voteValues = [0, 0.5, 1, 2, 3, 5, 8, 13];

const EditPoll = ({ update }) => {
  const [vote, setVote] = useState(0);

  return (
    <div>
      <h2>Your vote: {vote}</h2>
      {voteValues.map(val => (
        <div key={val} className="dib ma2">
          <input
            type="radio"
            value={val}
            name="vote"
            checked={vote === val}
            onChange={ev => setVote(parseFloat(ev.target.value))}
          />
          <label className="ma1 dib">{val}</label>
        </div>
      ))}
      <button onClick={() => update(vote)}>Submit</button>
    </div>
  );
};

export default ({ match }) => {
  const [updateVote] = useMutation(VOTE_POLL_MUTATION);
  return (
    <EditPoll
      update={vote =>
        updateVote({ variables: { pollId: match.params.id, dificulty: vote } })
      }
    />
  );
};
