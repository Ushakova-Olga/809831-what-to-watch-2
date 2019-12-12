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
        isBlocking: false,
      };
    }

    componentDidMount() {
      this.setState({
        error: ``,
        isFormValid: false,
        isBlocking: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        idBlocking: false,
        error: ``,
      });
      this._handleFormChange = null;
      this._handleFormSubmit = null;
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
            if (response) {
              if (response.data) {
                return history.push(`/films/${id}`);
              }
            }
            return null;
          });
      }
    }

    render() {
      const {isFormValid, error, isBlocking} = this.state;
      const {errorReview} = this.props;

      return <Component
        {...this.props}
        error={error}
        isFormValid={isFormValid}
        onChange={this._handleFormChange}
        onSubmit={this._handleFormSubmit}
        isBlocking={isBlocking}
        errorReview={errorReview}
      />;
    }
  }

  WithFormSubmit.propTypes = {
    id: PropTypes.number.isRequired,
    uploadReview: PropTypes.func.isRequired,
    errorReview: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
  };
  return WithFormSubmit;
};

const mapStateToProps = (state) => ({
  errorReview: state.errorReview,
});

const mapDispatchToProps = (dispatch) => ({
  uploadReview: bindActionCreators(Operation.uploadReview, dispatch),
});

export {withFormSubmit};
export default compose(connect(mapStateToProps, mapDispatchToProps), withFormSubmit);
