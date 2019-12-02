import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };
      this._isMounted = false;

      this.overMouseHandler = this.overMouseHandler.bind(this);
      this.leaveMouseHandler = this.leaveMouseHandler.bind(this);
    }

    overMouseHandler() {
      if (this._isMounted) {
        this.setState({
          isActive: true,
        });
      }
    }

    leaveMouseHandler() {
      if (this._isMounted) {
        this.setState({
          isActive: false
        });
      }
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.overMouseHandler = null;
      this.leaveMouseHandler = null;
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
