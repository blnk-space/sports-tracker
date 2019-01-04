import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { withSize } from 'react-sizeme';
import PropTypes from 'prop-types';

import { startChannel, stopChannel } from './actions';
import { runnersSelector, eventsSelector, readerIdSelector } from './selectors';
import { getRemMultiplier } from './helpers';

import RowItem from './RowItem';
import Placeholder from './Placeholder';
import Wrapper from './styled/Wrapper';

class RunnerListTable extends Component {
  componentDidMount() {
    if (this.props.isVisible) {
      this.props.startChannel();
    }
  }

  componentDidUpdate(prevProps) {
    // logic to stop channel when window is not in view
    if (prevProps.isVisible && !this.props.isVisible) {
      this.props.stopChannel();
    } else if (!prevProps.isVisible && this.props.isVisible && prevProps.channelStatus !== 'on') {
      this.props.startChannel();
    }
  }

  render() {
    const { runners, eventFeed, size: { width }, baseReaderId } = this.props;
    return (
      <Wrapper>
        <div>
          {runners.length === 0 ?
          <section>
            <h3>
              Waiting for race to begin...
            </h3>
            <Placeholder />
          </section>
          : <ul style={{padding: 0}}>
          <List
            height={window.innerHeight * 0.85}
            itemCount ={runners.length}
            itemData={{ eventFeed, runners, baseReaderId }}
            itemSize={getRemMultiplier(width) * 6}
            width={width}
            itemKey={(i, d) => d.runners[i]}
          >
            {RowItem}
          </List>
          </ul>
        }
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

RunnerListTable.propTypes = {
  runners: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  eventFeed: PropTypes.objectOf(PropTypes.object),
  baseReaderId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  serverStatus: PropTypes.string,
  channelStatus: PropTypes.string,
};

RunnerListTable.defaultProps = {
  runners: [],
  eventFeed: {},
  baseReaderId: false,
  serverStatus: 'dormant',
  channelStatus: 'untouched',
};

export default connect(mapStateToProps, {
  startChannel,
  stopChannel,
})(withSize()(RunnerListTable));
