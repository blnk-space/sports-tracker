
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import ConnectionBox from './styled/ConnectionBox';
import Clock from './styled/Clock';

const ConnectionEventItem = ({ time, style, disconnected }) => (
    <ConnectionBox style={style} disconnected={disconnected}>
      <div className="content">
        <div className="indicator" />
        <div className="data">
          <div className="connectionInfo">
            {disconnected ? 'Connection Lost' : 'Connected' }
          </div>
          <div className="time">
            {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}:{time.getMilliseconds()}
            <Clock />
          </div>
        </div>
      </div>
    </ConnectionBox>
);

ConnectionEventItem.propTypes = {
  time: PropTypes.object,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])),
  disconnected: PropTypes.bool,
};

// ConnectionEventItem.defaultProps = {
//   time: new Date(),
//   style: {},
//   disconnected: true,
// };

export default ConnectionEventItem;
