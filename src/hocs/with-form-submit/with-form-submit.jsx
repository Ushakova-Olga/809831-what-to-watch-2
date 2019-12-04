import React from "react";
import {compose} from "recompose";
import PropTypes from "prop-types";
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/reducer";

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
      };
    }

    render() {
      const {isFormValid, error, isSending} = this.state;
      const {errorLoadingReview, history, id} = this.props;
      console.log(history);
      return isSending ? <Redirect to={`/films/${id}`} /> : <Component
        {...this.props}
        error={error}
        isFormValid={isFormValid}
        onChange={this._onChange}
        onSubmit={this._onSubmit}
        errorLoadingReview={errorLoadingReview}
      />;
    }

    _onChange(rating, text) {
      this.setState(() => {
        let valid = false;

        if (text.length >= 50 && text.length <= 400) {
          valid = true;
        }

        return {
          isFormValid: valid
        };
      });
    }

    componentDidMount() {

      this.setState ({
        error: ``,
        isFormValid: false,
        isSending: false,
        isUnmounted: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        isSending: false,
        isUnmounted: true,
      });
      this._onChange = null;
      this._onSubmit = null;
    }

    _onSubmit(rating, comment) {
      const {id, uploadReview, history} = this.props;
      this.setState({
        isSending: true,
      });
      uploadReview(id, {rating, comment})
        .then((response) => {
          if (response.data) {
            //return history.push(`/films/${id}`);
            //return <Redirect to={`/films/${id}`} />;
            /*if (!this.state.isUnmounted) {
              this.setState ({
                isSending: true,
              });
            }*/
          }
          return;
        })
        .catch((error) => {
          const errorObject = JSON.parse(JSON.stringify(error));
          this.setState({error: errorObject.message});
          return;
        });
    }
  }

  WithFormSubmit.propTypes = {
    id: PropTypes.number.isRequired,
    uploadReview: PropTypes.func.isRequired,
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
