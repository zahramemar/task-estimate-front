import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";

const VOTES_QUERY = gql`
  query VotesQuery($pollId: ID!) {
    poll(id: $pollId) {
      votes {
        id
        user {
          name
        }
        dificulty
      }
    }
  }
`;

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

const VOTES_SUBSCRIPTION = gql`
  subscription VotesSubscription {
    newVote {
      id
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

const Votes = ({ pollId }) => {
  useSubscription(VOTES_SUBSCRIPTION);
  const { loading, error, data, refetch } = useQuery(VOTES_QUERY, {
    variables: { pollId }
  });
  refetch();

  console.log(data);

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data.poll.votes.map(vote => (
        <div className="ma3" key={vote.id}>
          <div>Name: {vote.user.name}</div>
          <div>Vote: {vote.dificulty}</div>
        </div>
      ))}
    </div>
  );
};

export default ({ match }) => {
  const [updateVote] = useMutation(VOTE_POLL_MUTATION);
  return (
    <div>
      <EditPoll
        update={vote =>
          updateVote({
            variables: { pollId: match.params.id, dificulty: vote }
          })
        }
      />
      <Votes pollId={match.params.id} />
    </div>
  );
};
