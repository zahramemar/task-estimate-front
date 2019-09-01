import React from "react";
import Poll from "./Poll";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useSubscription, useQuery } from "@apollo/react-hooks";

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

const POLL_SUBSCRIPTION = gql`
  subscription NewPolls {
    newPoll {
      id
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

export default () => {
  useSubscription(POLL_SUBSCRIPTION);
  console.log("updating");
  const { loading, error, data, refetch } = useQuery(POLLS_QUERY, {
    fetchPolicy: "network-only",
    partialRefetch: true
  });
  refetch();

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  return <Polls polls={data.polls} />;
};
