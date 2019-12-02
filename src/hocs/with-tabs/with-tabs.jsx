import React, {PureComponent} from "react";

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: 0,
      };

      //this.overMouseHandler = this.overMouseHandler.bind(this);
      //this.leaveMouseHandler = this.leaveMouseHandler.bind(this);

      this.onMouseClickChild = this.onMouseClickChild.bind(this);
    }

    onMouseClickChild(id) {
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
        onMouseClickChild={this.onMouseClickChild}
      />;
    }

  }

  WithTabs.propTypes = {};

  return WithTabs;
};

export default withTabs;
