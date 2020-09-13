import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { createNewUser } from "../../actions";
import FontLogo from "../../components/FontLogo";

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
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
            firstName,
            lastName,
            email,
            password
        } = this.state;
        const { isAuthorised, error, isLoading } = this.props;
        if (isAuthorised) {
            return <Redirect to="/onboard"/>;
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 col-md-12 text-right" style={{
                        paddingTop: "1em",
                        paddingBottom: "1em"
                    }}>
                        <span className="toggle-button-auth" style={{ marginRight: "1em" }}>
                            Already have an account ?
                        </span>
                        <Link to="/login" className="btn sm btn-info-line">SIGN IN</Link>
                    </div>
                </div>
                <div className="row" style={{
                    flex: "1 1",
                    alignItems: "center"
                }}>
                    <div className="col-12 col-md-offset-1 col-md-6 login-form-wrapper">
                        <h1 style={{
                            marginBottom: "0.5em"
                        }}>SignUp into <FontLogo color="#495057" display="inline" fontSize="1"/></h1>
                        <label className="text-light" style={{
                            fontWeight: "100",
                            marginBottom: "3em"
                        }}>Enter your details below.</label>
                        <form className="login-form">
                            {error.message
                                ? <p className="inline--error">{error.message}</p>
                                : ""
                            }
                            <div>
                                <Input
                                    icon="user-alt"
                                    className="shadowed border"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={this.handleOnChange}
                                    name="firstName"/>
                                <Input
                                    icon="user-alt"
                                    className="shadowed border"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={this.handleOnChange}
                                    name="lastName"/>
                            </div>
                            <Input
                                icon="envelope-open"
                                className="shadowed border"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleOnChange}
                                name="email"/>
                            <Input
                                icon="unlock-alt"
                                className="shadowed border"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={this.handleOnChange}
                                name="password"/>
                            <Button
                                text="Sign Up"
                                onClick={this.submitLogin}
                                className={`bg-info floating-shadow ${isLoading ? "disabled" : ""}`}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ user }) => ({ isAuthorised: user.isAuthorised, error: user.error, isLoading: user.isLoading });
export default connect(mapStateToProps, { createNewUser })(SignUp);
