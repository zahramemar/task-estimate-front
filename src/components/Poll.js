import React, { Component } from "react";

export default class Poll extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="ml1">
          {this.props.poll ? <div>{this.props.poll.description}</div> : ""}

          <div className="f6 lh-copy gray">
            votes:
            {this.props.poll && this.props.poll.votes.length > 0 ? (
              this.props.poll.votes.map(vote => (
                <span key={vote.id} className="ma1">
                  {vote.dificulty}
                </span>
              ))
            ) : (
              <span>not voted yet</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
