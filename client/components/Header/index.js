import React, { Component } from "react";
import UserBox from "../UserBox";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header--partition">
                    <img src="/assets/logo-horizontal.png" className="header--logo"/>
                </div>
                <div className="header--partition">
                    <UserBox view="min"/>
                </div>
            </div>
        );
    }
}

export default Header;
