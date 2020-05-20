import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import Input from "../../components/Input";
import { createNewUser } from "../../actions";

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    };

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };

    submitLogin = async () => {
        // eslint-disable-next-line no-shadow
        const { createNewUser } = this.props;
        await createNewUser({
            ...this.state
        });
    };

    render() {
        const {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        } = this.state;
        const { isAuthorised, error, isLoading } = this.props;
        if (isAuthorised) {
            return <Redirect to="/onboard"/>;
        }
        return (
            <div className="page-wrapper">
                <div className="row">
                    <div className="column page-side-wrapper">
                        <img src="/assets/help.png" alt="HELP.png"/>
                        <h1>Plan</h1>
                        <h2>Collaborate</h2>
                        <h3>Succeed</h3>
                    </div>
                    <div className="column">
                        <div className="login-form-wrapper">
                            <img src="/assets/logo.png" className="logo-img"/>
                            <form className="login-form">
                                {error.message
                                    ? <p className="inline--error">{error.message}</p>
                                    : ""
                                }
                                <div>
                                    <Input
                                        icon="user-alt"
                                        className="rounded shadowed border"
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={this.handleOnChange}
                                        name="first_name"/>
                                    <Input
                                        icon="user-alt"
                                        className="rounded shadowed border"
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={this.handleOnChange}
                                        name="last_name"/>
                                </div>
                                <Input
                                    icon="envelope-open"
                                    className="rounded shadowed border"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleOnChange}
                                    name="email"/>
                                <Input
                                    icon="unlock-alt"
                                    className="rounded shadowed border"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={this.handleOnChange}
                                    name="password"/>
                                <button
                                    className={`btn bg-awesome gradient rounded shadowed text-white form-control ${isLoading
                                        ? "disabled"
                                        : ""}`}
                                    onClick={this.submitLogin}
                                    type="button">
                                    Sign Up
                                </button>
                                <Link className="auth-back-link" to="/login">Already a user ? Login</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ user }) => ({ isAuthorised: user.isAuthorised, error: user.error, isLoading: user.isLoading });
export default connect(mapStateToProps, { createNewUser })(SignUp);
