import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import Wrapper from './Wrapper';
import StatusIndicator from './StatusIndicator';

/* eslint-disable react/prefer-stateless-function */
const Header = ({ serverStatus, channelStatus }) => (
    <Wrapper>
      <NavBar>
        <StatusIndicator
          title="Server"
          active={serverStatus === 'on'}
        />
        <StatusIndicator
          title="Channel"
          active={channelStatus === 'on'}
        />
      </NavBar>
    </Wrapper>
);

Header.propTypes = {
  serverStatus: PropTypes.string,
  channelStatus: PropTypes.string,
};

const mapStateToProps = state => ({
  serverStatus: state.capturesReducer.serverStatus,
  channelStatus: state.capturesReducer.channelStatus,
});

export default connect(mapStateToProps)(Header);
