import { Component } from 'react';

import visibilityHelper from './helper';

const { hidden, visibilityChange } = visibilityHelper();

class VisibilityTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  componentDidMount() {
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);

    document.addEventListener('focus', this.forceVisibilityTrue, false);
    document.addEventListener('blur', this.forceVisibilityFalse, false);

    window.addEventListener('focus', this.forceVisibilityTrue, false);
    window.addEventListener('blur', this.forceVisibilityFalse, false);
  }

  handleVisibilityChange = (forcedFlag) => {
    if (typeof forcedFlag === 'boolean') {
      if (forcedFlag) {
        return this.setVisibility(true);
      }
      return this.setVisibility(false);
    }

    if (document[hidden]) {
      return this.setVisibility(false);
    }
    return this.setVisibility(true);
  };

  forceVisibilityTrue = () => {
    this.handleVisibilityChange(true);
  };

  forceVisibilityFalse = () => {
    this.handleVisibilityChange(false);
  };

  setVisibility = (flag) => {
    this.setState((prevState) => {
      if (prevState.isVisible === flag) return null;
      return { isVisible: flag };
    });
  };

  componentWillUnmount() {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange, false);

    document.removeEventListener('focus', this.forceVisibilityTrue, false);
    document.removeEventListener('blur', this.forceVisibilityFalse, false);

    window.removeEventListener('focus', this.forceVisibilityTrue, false);
    window.removeEventListener('blur', this.forceVisibilityFalse, false);
  }

  render() {
    return this.props.children(this.state.isVisible);
  }
}

export default VisibilityTracker;
