import React, { Component } from "react";
import Header from "../../components/Header";

class AuthPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                { this.props.children }
            </React.Fragment>
        );
    }
}

export default AuthPage;
