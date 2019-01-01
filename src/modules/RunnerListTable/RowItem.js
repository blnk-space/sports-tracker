import React from 'react';

import Runner from './Runner';

const RowItem = (props) => {
  const { index, data } = props;
  const { eventFeed, runners } = data;
  const currentItem = eventFeed[runners[index]];
  if (currentItem && currentItem.type === 'gap') {
    return (<div>
      Connection Lost
    </div>);
  }
  return <Runner {...props} />;
};

export default RowItem;
