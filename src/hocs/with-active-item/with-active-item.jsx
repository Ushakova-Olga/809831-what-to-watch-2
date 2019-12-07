import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };
      this._isMounted = false;

      this._handleMouseOver = this._handleMouseOver.bind(this);
      this._handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    _handleMouseOver() {
      if (this._isMounted) {
        this.setState({
          isActive: true,
        });
      }
    }

    _handleMouseLeave() {
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
      this._handleMouseOver = null;
      this._handleMouseLeave = null;
    }

    render() {
      return <Component
        {...this.props}
        isActive={this.state.isActive}
        activeItem={this.state.activeItem}
        onMouseEnter={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
      />;
    }

  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
