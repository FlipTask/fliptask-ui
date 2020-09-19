import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { createNewUser } from "../../actions";
import FontLogo from "../../components/FontLogo";
import Loader from "../../components/Loader";

const EMPTY_ERROR_STATE = {
    email: null,
    password: null,
    firstName: null,
    lastName: null
};
class SignUp extends Component {
    state = {
        form: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        },
        error: {
            ...EMPTY_ERROR_STATE
        }
    };

    static getDerivedStateFromProps(prevProps, prevState) {
        if (Object.keys(prevProps.error).length) {
            return {
                ...prevState,
                error: {
                    ...prevState.error,
                    ...prevProps.error
                }
            };
        }
        return {
            ...prevState,
            error: {
                ...prevState.error,
                ...EMPTY_ERROR_STATE
            }
        };
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {
            ...this.state
        };
        obj.form[name] = value;
        this.setState(obj);
    };

    submitLogin = async () => {
        // eslint-disable-next-line no-shadow
        const { createNewUser } = this.props;
        await createNewUser({
            ...this.state.form
        });
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            password
        } = this.state.form;
        const { error } = this.state;
        const { isLoading, success } = this.props;
        // console.log(error);
        if (success) {
            return (
                <div className="row" style={{ flex: "1 1", alignItems: "center" }}>
                    <div className="col-12 col-md-12  text-center">
                        <div className="img-container">
                            <img src="/assets/mail-sent.png" alt="Mail Sent Successfully" style={{
                                maxWidth: "22%",
                                margin: "auto",
                                display: "block"
                            }}/>
                        </div>
                        <div className="welcome-text">
                            <h2>You're nearly there!</h2>
                            <p className="text-light-grey">A verification mail has been sent on your email account. Please check your inbox to verify.</p>
                        </div>
                        <Link to="/login" className="btn btn-sm btn-primary-line" style={{ marginTop: "1em" }}>GO TO SIGN-IN</Link>
                    </div>
                </div>
            );
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
                        <Link to="/login" className="btn sm btn-primary-line">SIGN IN</Link>
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
                            <div className="form-group-inline row">
                                <Input
                                    error={error.firstName}
                                    // icon="user-alt"
                                    wrapperClass="col-12 col-xs-12 col-md-6"
                                    label="First Name"
                                    className={`shadowed rounded ${error.firstName ? "border-danger" : "border"}`}
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={this.handleOnChange}
                                    name="firstName"/>
                                <Input
                                    error={error.lastName}
                                    wrapperClass="col-12 col-xs-12 col-md-6"
                                    // icon="user-alt"
                                    label="Last Name"
                                    className={`shadowed rounded ${error.lastName ? "border-danger" : "border"}`}
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={this.handleOnChange}
                                    name="lastName"/>
                            </div>
                            <Input
                                error={error.email}
                                // icon="envelope-open"
                                className={`shadowed rounded ${error.email ? "border-danger" : "border"}`}
                                type="email"
                                label="Email"
                                placeholder="xyz@abc.com"
                                value={email}
                                onChange={this.handleOnChange}
                                name="email"/>
                            <Input
                                error={error.password}
                                // icon="unlock-alt"
                                className={`shadowed rounded ${error.password ? "border-danger" : "border"}`}
                                type="password"
                                label="Password"
                                placeholder="********"
                                value={password}
                                onChange={this.handleOnChange}
                                name="password"/>
                            <Button
                                text="Sign Up"
                                onClick={this.submitLogin}
                                className={`bg-primary floating-shadow ${isLoading ? "disabled" : ""}`}
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    error: user.signup.error,
    isLoading: user.signup.pending,
    success: user.signup.success
});
export default connect(mapStateToProps, { createNewUser })(SignUp);
