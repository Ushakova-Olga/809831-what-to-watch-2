import React from "react";

const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const withSignIn = (Component) => {
  class WithSignIn extends React.PureComponent {
    constructor(props) {
      super(props);

      this._handleFormChange = this._handleFormChange.bind(this);

      this.state = {
        errorEmail: ``,
        errorPassword: ``,
        email: ``,
        password: ``,
        isFormValid: false,
      };
    }

    componentDidMount() {
      this.setState({
        errorEmail: ``,
        errorPassword: ``,
        email: ``,
        password: ``,
        isFormValid: false,
      });
    }
    componentWillUnmount() {
      this.setState({
        isFormValid: false,
        errorEmail: ``,
        errorPassword: ``,
        email: ``,
        password: ``,
      });
      this._onChange = null;
    }

    _handleFormChange(email, password) {
      this.setState((prevState) => {
        let valid = prevState.isFormValid;
        let errorEmail = prevState.errorEmail;
        let errorPassword = prevState.errorPassword;
        let emailCurrent = prevState.email;
        let passwordCurrent = prevState.password;

        if (email !== ``) {
          emailCurrent = email;
          if (reg.test(email) === false) {
            errorEmail = `Введите корректный адрес e-mail`;
          } else {
            errorEmail = ``;
          }
        }

        if (password !== ``) {
          passwordCurrent = password;
          if (password.length < 3) {
            errorPassword = `Количество символов в пароле должно быть более 3-x`;
          } else {
            errorPassword = ``;
          }
        }

        if ((passwordCurrent.length < 3) || (reg.test(emailCurrent) === false)) {
          valid = false;
        } else {
          valid = true;
        }

        return {
          errorEmail,
          errorPassword,
          email: emailCurrent,
          password: passwordCurrent,
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
