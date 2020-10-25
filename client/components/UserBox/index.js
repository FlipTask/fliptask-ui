import React, { Component } from "react";
import { connect } from "react-redux";
import UserOptions from "./UserOptions";

class UserBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openList: false
        };
        this.optionListElement = React.createRef();
        this.t = null;
    }

    onClick = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        this.t = null;
        this.setState({
            openList: !this.state.openList
        }, () => {
            if (this.state.openList) {
                this.optionListElement.current.focus();
            }
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
        }, 800);
    }

    render() {
        const {
            view = "max",
            user
        } = this.props;
        const isViewMin = !!((view === "min" || view === "minimum"));
        return (
            <div
                onBlur={this.onBlur}
                tabIndex="0"
                title={`${user.firstName} ${user.lastName}`}
                className={`user-box ${isViewMin ? "user-box-min" : ""}`}
            >
                <div className={`user-box--wrapper ${this.state.openList ? "active" : ""}`}>
                    <div className="user-box--img" onClick={this.onClick}>
                        <img src="/assets/avatars/64px/1.png" alt="1.png"/>
                    </div>
                    {
                        isViewMin
                            ? ""
                            : <React.Fragment>
                                <div className="user-box--info">
                                    <span className="user-box--name text-default">{user.firstName} {user.lastName}</span>
                                </div>
                                <div className="user-box--dropdown">
                                    <i className="far fa-chevron-down"></i>
                                </div>
                            </React.Fragment>
                    }
                    {
                        this.state.openList
                            ? <UserOptions onBlur={this.onBlur} domRef={this.optionListElement}/>
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

})(UserBox);
