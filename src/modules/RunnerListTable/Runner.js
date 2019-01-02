/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import RunnerBox from './styled/RunnerBox';
import Clock from './styled/Clock';

const Runner = ({ index, style, data }) => {
  const { eventFeed, runners, baseReaderId } = data;
  const { athlete: { number, name }, reader_id, timestamp } = eventFeed[runners[index]];
  const isRunning = reader_id === baseReaderId;
  const date = !isRunning && new Date(timestamp);

  return (
    <RunnerBox style={style} isRunning={isRunning}>
      <div className="content">
        <div className="number">
          {number}
          {isRunning && <div className="loader-bar">
            <div className="bar" />
          </div>
          }
        </div>
        <div className="data">
          <div className="personInfo">
            {name}
            <span>{isRunning ? 'In Corridor' : 'Finished'}</span>
          </div>
          {!isRunning && <div className="time">
              {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}:{date.getMilliseconds()}
              <Clock />
            </div>
          }
        </div>
      </div>
    </RunnerBox>
  );
};

Runner.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])),
};

Runner.defaultProps = {
  index: '0',
  style: {},
  data: {},
};

export default Runner;
