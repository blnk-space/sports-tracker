import React from 'react';
import PropTypes from 'prop-types';

import Runner from './Runner';
import ConnectionEventItem from './ConnectionEventItem';

const RowItem = (props) => {
  const { index, data, style } = props;
  const { eventFeed, runners } = data;
  const currentItem = eventFeed[runners[index]];
  if (currentItem && currentItem.type === 'gap') {
    return (
      <ConnectionEventItem
        style={style}
        disconnected={currentItem.event === 'disconnected'}
        time={new Date(currentItem.time)}
      />
    );
  }
  return <Runner {...props} />;
};

RowItem.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])),
};

RowItem.defaultProps = {
  index: '0',
  style: {},
  data: {},
};

export default RowItem;
