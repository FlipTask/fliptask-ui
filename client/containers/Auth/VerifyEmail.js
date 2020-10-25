import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { Link } from "react-router-dom";
import SVG from "../../components/Svg";
import Auth from ".";
import {
    verifyEmail
} from "../../actions";


class VerifyEmail extends Component {
    state = {
        response: {}
    };

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        this.verifyEmail(qs.hash);
    }

    verifyEmail = async (hash) => {
        const res = await this.props.verifyEmail(hash);
        this.setState({
            response: res
        });
    }

    render() {
        const { response } = this.state;
        return (
            <Auth>
                <div className="row" style={{ flex: "1 1", alignItems: "center" }}>
                    <div className="col-12 col-xs-12 col-md-12  text-center">
                        <div className="img-container">
                            <SVG name={response.error ? "broken" : "confirmation"}/>
                        </div>
                        <div className="welcome-text">
                            <h2>
                                {
                                    response.error ? "Oops! Something is not right."
                                        : "Yay! You are good to go."
                                }
                            </h2>
                            <p className="text-light-grey">{
                                response.error ? response.messages.error : response.message
                            }</p>
                        </div>
                        <Link to="/login" className="btn btn-sm btn-primary rounded floating-shadow" style={{ marginTop: "1em" }}>GO TO SIGN-IN</Link>
                    </div>
                </div>
            </Auth>
        );
    }
}

export default connect(() => ({}), {
    verifyEmail
})(VerifyEmail);
