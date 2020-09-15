import React, { Component } from "react";
import UserBox from "../UserBox";
import FontLogo from "../FontLogo";

class Header extends Component {
    render() {
        return (
            <div className="header col-12 col-md-12 no-padding">
                <div className="header--partition">
                    <FontLogo fontSize="1"/>
                </div>
                <div className="header--partition">
                    <UserBox view="min"/>
                </div>
            </div>
        );
    }
}

export default Header;
