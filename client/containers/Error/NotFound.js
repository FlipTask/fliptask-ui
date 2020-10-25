import React, { Component } from "react";
import { Link } from "react-router-dom";
import SVG from "../../components/Svg";

class NotFound extends Component {
    render() {
        return (
            <div className="row" style={{ flex: "1 1", alignItems: "center" }}>
                <div className="col-12 col-xs-12 col-md-12  text-center">
                    <div className="img-container">
                        <SVG name="notfound"/>
                    </div>
                    <div className="welcome-text">
                        <h2>It looks like you are lost.</h2>
                    </div>
                    <Link to="/" className="btn btn-sm btn-primary rounded floating-shadow" style={{ marginTop: "1em" }}>GO TO HOME</Link>
                </div>
            </div>
        );
    }
}

export default NotFound;
