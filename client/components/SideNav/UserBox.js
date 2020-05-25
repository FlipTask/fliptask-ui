import React, { Component } from "react";
import { connect } from "react-redux";
import UserOptions from "./UserOptions";
import {
    logout
} from "../../actions";

class UserBox extends Component {
    state = {
        openList: false
    }

    t = null;

    onClick = () => {
        this.t = null;
        this.setState({
            openList: !this.state.openList
        });
    }

    onBlur = (e) => {
        e.preventDefault();
        clearTimeout(this.t);
        this.t = setTimeout(() => {
            this.setState({
                openList: false
            });
            clearTimeout(this.t);
        }, 100);
    }

    render() {
        const {
            view = "max",
            user
        } = this.props;
        const isViewMin = !!((view === "min" || view === "minimum"));
        return (
            <div
                tabIndex="0"
                title={`${user.first_name} ${user.last_name}`}
                className={`user-box ${isViewMin ? "user-box-min" : ""}`}
                onClick={this.onClick}
                onBlur={this.onBlur}
            >
                <div className={`user-box--wrapper ${this.state.openList ? "active" : ""}`}>
                    <div className="user-box--img">
                        <img src="/assets/avatars/64px/1.png" alt="1.png"/>
                    </div>
                    {
                        isViewMin
                            ? ""
                            : <React.Fragment>
                                <div className="user-box--info">
                                    <span className="user-box--name text-white">{user.first_name} {user.last_name}</span>
                                    {/* <span className="user-box--status text-light">
                                        <i className="fa fa-moon"></i>
                                        Away
                                    </span> */}
                                </div>
                                <div className="user-box--dropdown">
                                    <i className="far fa-chevron-down"></i>
                                </div>
                            </React.Fragment>
                    }
                    {
                        this.state.openList
                            ? <UserOptions logout={this.props.logout}/>
                            : ""
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    user: user.user
});
export default connect(mapStateToProps, {
    logout
})(UserBox);
