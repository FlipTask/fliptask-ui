import React, { Component } from "react";
import { connect } from "react-redux";
import Switch from "../Switch";
import {
    logout,
    toggleTheme
} from "../../actions";

class UserOptions extends Component {
    onLogout = async () => {
        await this.props.logout();
    }

    changeTheme = async () => {
        const theme = this.props.theme === "night" ? "day" : "night";
        await this.props.toggleTheme(theme);
    }

    render() {
        const {
            user,
            theme,
            onBlur,
            domRef
        } = this.props;
        return (
            <div className="user-options-list" onBlur={onBlur} ref={domRef}>
                <div className="user-options-list--wrapper">
                    <div className="user-option-list-item">
                        <span className="text-success">
                            {user.firstName} {user.lastName}
                        </span>
                    </div>
                    <div className="user-option-list-item">
                        <div className="theme-switch">
                            <i className="fas fa-sun"/>
                            <Switch checked={theme === "night"} onChange={this.changeTheme}/>
                            <i className="fas fa-moon"/>
                        </div>
                    </div>
                    <div className="user-option-list-item" onClick={this.onLogout}>
                        Logout
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app, user }) => ({
    theme: app.theme,
    user: user.user
});
export default connect(mapStateToProps, {
    logout,
    toggleTheme
})(UserOptions);
