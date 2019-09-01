import React from "react";
import Poll from "./Poll";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export const POLLS_QUERY = gql`
  query {
    polls {
      description
      id
      postedBy {
        name
      }
      votes {
        id
        dificulty
        user {
          name
        }
      }
    }
  }
`;

const Polls = ({ polls }) => (
  <div>
    {polls.map(poll => (
      <Link
        key={poll.id}
        to={`/vote/${poll.id}`}
        className="ml1 no-underline black"
      >
        <Poll poll={poll} />
      </Link>
    ))}
  </div>
);

export default () => (
  <Query query={POLLS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      return <Polls polls={data.polls} />;
    }}
  </Query>
);
