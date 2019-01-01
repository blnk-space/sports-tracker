/* eslint-disable camelcase */
import React from 'react';
import RunnerBox from './styled/RunnerBox';

const Runner = () => (
    <RunnerBox isRunning>
      <div className="content">
        <div className="number">
          XXXX
          <div className="loader-bar">
            <div className="bar" />
          </div>
        </div>
        <div className="data">
          <div className="personInfo loading">
            <span></span>
          </div>
        </div>
      </div>
    </RunnerBox>
);

export default Runner;
