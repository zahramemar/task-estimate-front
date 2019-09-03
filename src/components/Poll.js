import React from "react";

export default ({ poll }) => {
  return (
    <div className="flex mt2 items-start">
      <div className="ml1">
        {poll ? <div>{poll.description}</div> : ""}
        {/* 
        <div className="f6 lh-copy gray">
          votes:
          {poll && poll.votes.length > 0 ? (
            poll.votes.map(vote => (
              <span key={vote.id} className="ma1">
                {vote.dificulty}
              </span>
            ))
          ) : (
            <span>not voted yet</span>
          )}
        </div> */}
      </div>
    </div>
  );
};
