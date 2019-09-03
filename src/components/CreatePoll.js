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
      <div className="mw8 center br2 ba b--light-blue bg-lightest-blue">
        <div className="dt-ns dt--fixed-ns w-100">
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <div>
              <input
                className="mb2 f6 tc db w-100 pv3"
                value={description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="A description for the poll"
              />
            </div>
          </div>
          <div className="pa3 pa4-ns dtc-ns v-mid">
            <Mutation
              mutation={CREATE_POLL_MUTATION}
              variables={{ description }}
              onCompleted={() => history.push("/")}
            >
              {createPollMutation => (
                <button
                  className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
                  onClick={createPollMutation}
                >
                  Submit
                </button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
      <div className="flex flex-column mt3"></div>
    </div>
  );
};
