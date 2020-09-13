import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { tryLogin } from "../../actions";
import Button from "../../components/Button";
import FontLogo from "../../components/FontLogo";
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
            <React.Fragment>
                <div className="row">
                    <div className=" col-12 col-md-12 text-right" style={{
                        paddingTop: "1em",
                        paddingBottom: "1em"
                    }}>
                        <span className="toggle-button-auth" style={{ marginRight: "1em" }}>
                            Don't have an account ?
                        </span>
                        <Link to="/signup" className="btn sm btn-primary-line">CREATE ACCOUNT</Link>
                    </div>
                </div>
                <div className="row" style={{
                    flex: "1 1",
                    alignItems: "center"
                }}>
                    <div className="col-12 col-md-offset-1 col-md-4 login-form-wrapper">
                        <h1 style={{
                            marginBottom: "0.5em"
                        }}>
                            Login into <FontLogo color="#495057" display="inline" fontSize="1"/>
                        </h1>
                        <label className="text-light" style={{
                            fontWeight: "100",
                            marginBottom: "3em"
                        }}>Enter your login details below.</label>
                        <form className="login-form text-left">
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
                                text="SIGN IN"
                                className={`bg-primary floating-shadow ${isLoading ? "disabled" : ""}`}
                                onClick={this.submitLogin}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>
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
