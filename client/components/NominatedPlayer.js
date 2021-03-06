import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removePlayer,
  changeDraftAmount,
  changeDraftAmountError,
  draftPlayer,
  deselectPlayer
} from "../store/draft";

class NominatedPlayer extends Component {
  render() {
    const {
      nominatedPlayer,
      removePlayer,
      changeDraftAmount,
      changeDraftAmountError,
      draftAmount,
      draftAmountError,
      draftPlayer,
      deselectPlayer
    } = this.props;
    const { maxBid } = nominatedPlayer;

    const draftAmountCheck = playerId => {
      if (!draftAmount || String(draftAmount).length > 2) {
        changeDraftAmountError();
      } else {
        draftPlayer(playerId);
      }
    };

    return (
      <div className="bottom-border">
        <h4 className="top-margin">Nominated Player</h4>
        {nominatedPlayer.id ? (
          <div>
            <div className="ui list">
              <div className="item player-list-item">
                <div className="ui grid">
                  <div className="two column row">
                    <div className="left floated column">
                      <h2>
                        {nominatedPlayer.name}, {nominatedPlayer.position}
                      </h2>
                      <p>
                        Projected Fantasy Points:
                        {" " + Math.round(nominatedPlayer.fpts)}
                      </p>
                    </div>
                    <div className="right floated column align-right">
                      <h2>
                        Maximum Bid:
                        {maxBid.length > 2 ? " " + maxBid : " $" + maxBid}
                      </h2>
                    </div>
                  </div>
                  <div className="one column row">
                    <div className="right floated column align-right">
                      <div className="ui icon input right-margin">
                        <input
                          type="text"
                          name="bid-amount"
                          placeholder="Drafted for..."
                          onChange={event =>
                            changeDraftAmount(event.target.value)
                          }
                        />
                        <i className="dollar sign icon" />
                      </div>
                      <button
                        type="submit"
                        value={draftAmount}
                        value={nominatedPlayer.id}
                        className="ui green button"
                        onClick={event => draftAmountCheck(event.target.value)}
                      >
                        Draft
                      </button>
                      <button
                        type="submit"
                        value={nominatedPlayer.id}
                        className="ui red button"
                        onClick={event => removePlayer(event.target.value)}
                      >
                        Remove
                      </button>
                      <button
                        className="ui button"
                        type="submit"
                        onClick={() => deselectPlayer()}
                      >
                        Deselect
                      </button>
                    </div>
                  </div>
                  {draftAmountError ? (
                    <div className="one column row">
                      <div className="right floated column align-right">
                        <p className="red">Please enter a valid bid amount.</p>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ui list no-top-margin">
            <div className="item player-list-item">
              <p>No player nominated.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  nominatedPlayer: state.draft.nominatedPlayer,
  draftAmount: state.draft.draftAmount,
  draftAmountError: state.draft.draftAmountError
});

const mapDispatch = dispatch => ({
  removePlayer: playerId => dispatch(removePlayer(playerId)),
  changeDraftAmount: amount => dispatch(changeDraftAmount(amount)),
  changeDraftAmountError: () => dispatch(changeDraftAmountError()),
  draftPlayer: playerId => dispatch(draftPlayer(playerId)),
  deselectPlayer: () => dispatch(deselectPlayer())
});

export default connect(
  mapState,
  mapDispatch
)(NominatedPlayer);
