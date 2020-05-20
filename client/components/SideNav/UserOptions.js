import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
    logout
} from "../../actions";

class UserOptions extends Component {
    onLogout = async () => {
        await this.props.logout();
        await this.props.history.push("/login");
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

const mapStateToProps = ({ user }) => ({
    user: user.user
});

export default withRouter(connect(mapStateToProps, {
    logout
})(UserOptions));
