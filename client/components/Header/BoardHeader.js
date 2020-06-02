import React, { Component } from "react";
import UserBox from "../UserBox";

class BoardHeader extends Component {
    render() {
        const { board } = this.props;
        return (
            <div className="header header--main">
                <UserBox view="min"/>
            </div>
        );
    }
}
export default BoardHeader;
