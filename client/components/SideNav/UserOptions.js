import React, { Component } from "react";

class UserOptions extends Component {
    onLogout = async () => {
        await this.props.logout();
    }

    render() {
        return (
            <div className="user-options-list">
                <div className="user-options-list--wrapper">
                    <div className="user-option-list-item" onClick={this.onLogout}>
                        <div className="btn">
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserOptions;
