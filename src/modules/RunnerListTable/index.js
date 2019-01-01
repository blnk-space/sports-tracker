import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { withSize } from 'react-sizeme';

import { startChannel, stopChannel } from './actions';
import { runnersSelector, eventsSelector, readerIdSelector } from './selectors';
import { getRemMultiplier } from './helpers';

import Runner from './Runner';
import Placeholder from './Placeholder';
import Wrapper from './styled/Wrapper';

class TaskList extends Component {
  componentDidMount() {
    if (this.props.isVisible) {
      this.props.startChannel();
    }
  }

  componentDidUpdate(prevProps) {
    // logic to stop channel when window is not in view
    if (prevProps.isVisible && !this.props.isVisible && prevProps.channelStatus === 'on') {
      this.props.stopChannel();
    } else if (!prevProps.isVisible && this.props.isVisible && prevProps.channelStatus !== 'on') {
      this.props.startChannel();
    }
  }

  render() {
    const { runners = [], eventFeed = {}, size: { width }, baseReaderId } = this.props;
    return (
      <Wrapper>
        <div>
          {runners.length === 0 &&
          <section>
            <h3>
              Waiting for race to begin...
            </h3>
            <Placeholder />
          </section>}
          <ul style={{padding: 0}}>
          <List
            height={window.innerHeight * 0.85}
            itemCount ={runners.length}
            itemData={{ eventFeed, runners, baseReaderId }}
            itemSize={getRemMultiplier(width) * 6}
            width={width}
            itemKey={(i, d) => d.runners[i]}
          >
            {Runner}
          </List>
          </ul>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  runners: runnersSelector(state),
  eventFeed: eventsSelector(state),
  baseReaderId: readerIdSelector(state),
  serverStatus: state.capturesReducer.serverStatus,
  channelStatus: state.capturesReducer.channelStatus,
});

export default connect(mapStateToProps, {
  startChannel,
  stopChannel,
})(withSize()(TaskList));
