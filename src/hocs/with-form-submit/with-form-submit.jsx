import React from "react";
import {compose} from "recompose";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Operation} from "../../reducer/reducer";

const TEXT_LENGHT_MIN = 50;
const TEXT_LENGHT_MAX = 400;

const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super(props);

      this._handleFormChange = this._handleFormChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);

      this.state = {
        error: ``,
        isFormValid: false,
        isUnmounted: false,
        isBlocking: false,
      };
    }

    componentDidMount() {
      this.setState({
        error: ``,
        isFormValid: false,
        isUnmounted: false,
        isBlocking: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        isUnmounted: true,
        idBlocking: false,
        error: ``,
      });
      this._onChange = null;
      this._onSubmit = null;
    }

    _handleFormChange(rating, text) {
      this.setState(() => {
        let valid = false;
        let error = ``;

        if (text.length < TEXT_LENGHT_MIN) {
          error = `Количество символов должно быть более 50-ти`;
        } else if (text.length > TEXT_LENGHT_MAX) {
          error = `Количество символов должно быть менее 400`;
        } else {
          valid = true;
        }

        return {
          error,
          isFormValid: valid
        };
      });
    }

    _handleFormSubmit(rating, comment) {
      const {id, uploadReview, history} = this.props;
      const {isFormValid} = this.state;

      if (isFormValid) {
        this.setState({
          isBlocking: true,
        });
        uploadReview(id, {rating, comment})
          .then((response) => {
            if (response.data) {
              return history.push(`/films/${id}`);
            } else {
              const errorObject = JSON.parse(JSON.stringify(response));
              this.setState({
                error: errorObject.message,
                isBlocking: false,
              });
            }
            return null;
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

    render() {
      const {isFormValid, error, isBlocking} = this.state;
      const {errorLoadingReview} = this.props;

      return <Component
        {...this.props}
        error={error}
        isFormValid={isFormValid}
        onChange={this._handleFormChange}
        onSubmit={this._handleFormSubmit}
        errorLoadingReview={errorLoadingReview}
        isBlocking={isBlocking}
      />;
    }
  }

  WithFormSubmit.propTypes = {
    id: PropTypes.number.isRequired,
    uploadReview: PropTypes.func.isRequired,
    errorLoadingReview: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
  };
  return WithFormSubmit;
};

const mapStateToProps = (state) => ({
  errorLoadingReview: state.errorLoadingReview,
});

const mapDispatchToProps = (dispatch) => ({
  uploadReview: bindActionCreators(Operation.uploadReview, dispatch),
});

export {withFormSubmit};
export default compose(connect(mapStateToProps, mapDispatchToProps), withFormSubmit);
