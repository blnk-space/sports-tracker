import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .title {
    font-weight: 300;
    font-size: 1rem;
    margin-right: 8px;
  }

  .indicator {
    width: 30px;
    height: 30px;
    background-color: ${props => (props.active ? props.theme.colors.green : props.theme.colors.red)};
    border-radius: 50%;
  }
`;

const StatusIndicator = ({ title, active }) => (
  <Wrapper active={active}>
    <div className="title">
      {title}
    </div>
    <div className="indicator">
    </div>
  </Wrapper>
);

export default StatusIndicator;
