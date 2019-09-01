import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_POLL_MUTATION = gql`
  mutation CreatePollMutation($description: String!) {
    createPoll(description: $description) {
      id
      description
    }
  }
`;

export default ({ history }) => {
  const [description, setDescription] = useState("");

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the poll"
        />
      </div>
      <Mutation
        mutation={CREATE_POLL_MUTATION}
        variables={{ description }}
        onCompleted={() => history.push("/")}
      >
        {createPollMutation => (
          <button onClick={createPollMutation}>Submit</button>
        )}
      </Mutation>
    </div>
  );
};
