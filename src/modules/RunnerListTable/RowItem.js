import React from 'react';

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

export default RowItem;
