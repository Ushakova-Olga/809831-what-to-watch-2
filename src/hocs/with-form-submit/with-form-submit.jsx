import React from "react";
import {compose} from "recompose";
import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/reducer";

const TEXT_LENGHT_MIN = 50;
const TEXT_LENGHT_MAX = 400;

const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this._onChange = this._onChange.bind(this);
      this._onSubmit = this._onSubmit.bind(this);

      this.state = {
        error: ``,
        isFormValid: false,
        isSending: false,
        isUnmounted: false,
        isBlocking: false,
      };
    }

    render() {
      const {isFormValid, error, isSending, isBlocking} = this.state;
      const {errorLoadingReview, id} = this.props;
      console.log(error);

      return isSending ? <Redirect to={`/films/${id}`} /> : <Component
        {...this.props}
        error={error}
        isFormValid={isFormValid}
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        errorLoadingReview={errorLoadingReview}
        isBlocking={isBlocking}
      />;
    }

    _onChange(rating, text) {
      this.setState(() => {
        let valid = false;

        if (text.length >= TEXT_LENGHT_MIN && text.length <= TEXT_LENGHT_MAX) {
          valid = true;
        }

        return {
          isFormValid: valid
        };
      });
    }

    componentDidMount() {
      this.setState({
        error: ``,
        isFormValid: false,
        isSending: false,
        isUnmounted: false,
        isBlocking: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        isSending: false,
        isUnmounted: true,
        idBlocking: false,
        error: ``,
      });
      this._onChange = null;
      this._onSubmit = null;
    }

    _onSubmit(rating, comment) {
      const {id, uploadReview, loadComments} = this.props;
      this.setState({
        isBlocking: true,
      });
      uploadReview(id, {rating, comment})
        .then((response) => {
          if (response.data) {
            if (!this.state.isUnmounted) {
              this.setState({
                isSending: true,
                isBlocking: false,
              });
              loadComments(response.data);
            }
          } else {
            const errorObject = JSON.parse(JSON.stringify(response));
            this.setState({
              error: errorObject.message,
              isBlocking: false,
            });
          }
          return;
        })
        .catch((error) => {
            const errorObject = JSON.parse(JSON.stringify(error));
            this.setState({
              error: errorObject.message,
              isBlocking: false,
            });
          return;
        });
    }
  }

  WithFormSubmit.propTypes = {
    id: PropTypes.number.isRequired,
    uploadReview: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    errorLoadingReview: PropTypes.string.isRequired,
  };
  return WithFormSubmit;
};

const mapStateToProps = (state) => ({
  errorLoadingReview: state.errorLoadingReview,
});

const mapDispatchToProps = (dispatch) => ({
  uploadReview: bindActionCreators(Operation.uploadReview, dispatch),
  loadComments: bindActionCreators(ActionCreator.loadComments, dispatch),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withFormSubmit);
