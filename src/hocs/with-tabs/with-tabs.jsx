import React, {PureComponent} from "react";

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: 0,
      };

      this._handlerMouseClickChild = this._handlerMouseClickChild.bind(this);
    }

    _handlerMouseClickChild(id) {
      this.setState({
        currentTab: id,
      });
    }

    componentWillUnmount() {
      this.currentTab = 0;
      this.onMouseClickChild = null;
    }

    render() {
      return <Component
        {...this.props}
        currentTab={this.state.currentTab}
        onMouseClickChild={this._handlerMouseClickChild}
      />;
    }

  }

  WithTabs.propTypes = {};

  return WithTabs;
};

export default withTabs;
