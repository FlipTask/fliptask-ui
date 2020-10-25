import React, { Component } from "react";
import UserBox from "../UserBox";
import FontLogo from "../FontLogo";

class Header extends Component {
    render() {
        return (
            <header className="header header--main col-12 col-md-12 col-xs-12 no-padding">
                <div className="header--partition col-2 col-md-2 col-xs-2 hidden-sm-down">
                    <FontLogo fontSize="1"/>
                </div>
                <div className="col-2 hidden-sm-up col-xs-2">
                    <button className="btn btn-transparent hamburger" onClick={this.props.toggleSideNav}>
                        <i className="far fa-bars"></i>
                    </button>
                </div>
                <div className="header--partition col-10 col-md-10 col-xs-10" style={{
                    justifyContent: "flex-end"
                }}>
                    <UserBox view="min"/>
                </div>
            </header>
        );
    }
}

export default Header;
