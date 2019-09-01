import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { POLLS_QUERY } from "./PollList";
import gql from "graphql-tag";
const CREATE_POLL_MUTATION = gql`
  mutation CreatePollMutation($description: String!, $url: String!) {
    createPoll(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;
export default class CreatePoll extends Component {
  state = {
    description: "",
    url: ""
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={CREATE_POLL_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
          update={(store, { data: { poll } }) => {
            const data = store.readQuery({ query: POLLS_QUERY });
            data.polls.unshift(poll);
            store.writeQuery({
              query: POLLS_QUERY,
              data
            });
          }}
        >
          {CreatePollMutation => (
            <button onClick={CreatePollMutation}>Submit</button>
          )}
        </Mutation>
      </div>
    );
  }
}
