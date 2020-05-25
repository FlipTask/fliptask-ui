import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { tryLogin } from "../../actions";
import Button from "../../components/Button";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };

    submitLogin = async () => {
        const { login } = this.props;
        const { username, password } = this.state;
        await login({
            email: username,
            password
        });
    };

    render() {
        const { username, password } = this.state;
        const {
            isAuthorised,
            error,
            isLoading
        } = this.props;
        if (isAuthorised) {
            // return <Redirect to="/onboard" />;
        }
        return (
            <form className="login-form">
                {
                    error.message
                        ? <p className="inline--error text-danger text-left">{error.message}</p> : ""
                }
                <Input
                    iconPosition="left"
                    icon="envelope-square"
                    className="shadowed border"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={this.handleOnChange}
                    name="username"/>
                <Input
                    iconPosition="left"
                    icon="unlock-alt"
                    className="shadowed border"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={this.handleOnChange}
                    name="password"/>

                <Button
                    text="Login"
                    className={`bg-neutral floating-shadow form-control ${isLoading ? "disabled" : ""}`}
                    onClick={this.submitLogin}
                />
                <Link className="auth-back-link" to="/signup">New Here ? Sign Up</Link>
            </form>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    isAuthorised: user.isAuthorised,
    error: user.error,
    isLoading: user.isLoading
});
export default connect(mapStateToProps, {
    login: tryLogin
})(Login);
