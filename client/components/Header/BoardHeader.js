import React, { Component } from "react";
import UserBox from "../SideNav/UserBox";

class BoardHeader extends Component {
    render() {
        const { board } = this.props;
        return (
            <div className="header header--transparent">
                <div>
                    <h2>{board.title}</h2>
                </div>
                <UserBox view="min"/>
            </div>
        );
    }
}
export default BoardHeader;
