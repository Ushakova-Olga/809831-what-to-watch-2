import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const TIME_TO_PLAY_PREVIEW = 1000;

const withTimer = (Component) => {
  class WithTimer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        timerId: null,
      };

      this._handleMouseEnter = this._handleMouseEnter.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    componentWillUnmount() {
      this._handleMouseEnter = null;
      this._handleMouseLeave = null;

      this.setState({
        timerId: null,
      });
    }

    _handleMouseEnter() {
      this.setState({
        timerId: setTimeout(this.props.onMouseEnter, TIME_TO_PLAY_PREVIEW),
      });
    }

    _handleMouseLeave() {
      clearTimeout(this.state.timerId);
      this.setState({
        timerId: null,
      });
      this.props.onMouseLeave();
    }

    render() {
      return <Component
        {...this.props}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      />;
    }

  }

  WithTimer.propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
  };

  return WithTimer;
};

export default withTimer;
