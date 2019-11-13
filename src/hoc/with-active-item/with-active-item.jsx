import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this.overMouseHandler = this.overMouseHandler.bind(this);
      this.leaveMouseHandler = this.leaveMouseHandler.bind(this);
    }

    overMouseHandler() {
      this.setState({
        isActive: true,
      });
    }

    leaveMouseHandler() {
      this.setState({
        isActive: false
      });
    }

    render() {
      return <Component
        {...this.props}
        isActive={this.state.isActive}
        activeItem={this.state.activeItem}
        onMouseEnter={this.overMouseHandler}
        onMouseLeave={this.leaveMouseHandler}
      />;
    }

  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
