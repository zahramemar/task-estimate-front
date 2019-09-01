import React, { Component } from "react";
import Poll from "./Poll";
import { Query } from "react-apollo";
import gql from "graphql-tag";
export const POLLS_QUERY = gql`
  {
    polls {
      description
      url
      id
      postedBy {
        name
      }
      votes {
        dificulty
        user {
          name
        }
      }
    }
  }
`;
class PollList extends Component {
  _updateCacheAfterCreatePoll = (store, createPoll, pollId) => {
    const data = store.readQuery({ query: POLLS_QUERY });

    const createdPoll = data.polls.find(poll => poll.id === pollId);
    createdPoll.poll = createPoll.poll;

    store.writeQuery({ query: POLLS_QUERY, data });
  };
  render() {
    return (
      <Query query={POLLS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const pollsToRender = data.polls;

          return (
            <div>
              {pollsToRender.map(poll => (
                <Poll key={Poll.id} poll={poll} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
export default PollList;
