import React from "react";

const withSignIn = (Component) => {
  class WithSignIn extends React.PureComponent {
    constructor(props) {
      super(props);

      this._handleFormChange = this._handleFormChange.bind(this);

      this.state = {
        errorEmail: ``,
        errorPassword: ``,
        isFormValid: false,
      };
    }

    componentDidMount() {
      this.setState({
        errorEmail: ``,
        errorPassword: ``,
        isFormValid: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        errorEmail: ``,
        errorPassword: ``,
      });
      this._onChange = null;
    }

    _handleFormChange(email, password) {
      this.setState((prevState) => {
        let valid = prevState.isFormValid;
        let errorEmail = prevState.errorEmail;
        let errorPassword = prevState.errorPassword;
        if (email !== ``) {
          if ((email.indexOf(`@`) <= 0) || (email.length < 4)) {
            errorEmail = `Введите корректный адрес e-mail`;
          } else {
            errorEmail = ``;
          }
        }

        if (password !== ``) {
          if (password.length < 3) {
            errorPassword = `Количество символов в пароле должно быть более 3-x`;
          } else {
            errorPassword = ``;
          }
        }

        if ((errorPassword !== ``) || (errorEmail !== ``)) {
          valid = false;
        } else {
          valid = true;
        }

        return {
          errorEmail,
          errorPassword,
          isFormValid: valid
        };
      });
    }

    render() {
      const {isFormValid, errorEmail, errorPassword} = this.state;

      return <Component
        {...this.props}
        errorEmail={errorEmail}
        errorPassword={errorPassword}
        isFormValid={isFormValid}
        onChange={this._handleFormChange}
      />;
    }
  }

  return WithSignIn;
};

export default withSignIn;
