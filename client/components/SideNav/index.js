import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NavList from "./NavList";
import Footer from "./Footer";
import AddNewListItem from "./AddNewListItem";
import Svg from "../Svg";

const delay = (time) => new Promise((res) => setTimeout(res, time));
class SideNav extends Component {
    state = {
        collapsing: false,
        open: false
    }

    toggleCollapse = async () => {
        this.setState({
            collapsing: !this.state.collapsing
        });
        await delay(300);
        this.setState({
            open: !this.state.open,
            collapsing: !this.state.collapsing
        });
    }

    render() {
        const {
            user,
            activeBoard,
            boards
        } = this.props;
        const {
            open,
            collapsing
        } = this.state;
        return (
            <React.Fragment>
                <div className={`sidenav--primary ${open ? "collapsed-in" : ""} ${collapsing ? "collapsing" : ""}`}>
                    <Link className="sidenav-head" to="/">
                        <img
                            src={`/assets/${open ? "logo" : "logo-horizontal"}.png`}
                            className="header--logo"
                            style={{
                                width: `${!collapsing ? (open ? "90%" : "60%") : "0%"}`
                            }}
                        />
                    </Link>
                    <div className="sidenav-body">
                        <div className="nav-list">

                            <Link to="/" className="nav-list-heading text-light not-anchor">
                                <div className="nav-list-name">
                                    <Svg name={"home"} className="side-nav-icon" height="30" width="30"/>
                                    {
                                        open || collapsing
                                            ? ""
                                            : <span className="nav-list-name--title">Home</span>
                                    }

                                </div>
                            </Link>

                        </div>
                        <NavList
                            openCollapsed={this.toggleCollapse}
                            collapsed={open}
                            collapsing={collapsing}
                            iconName={"team"}
                            accordian={true}
                            title={"Teams"}
                            urlPrefix={"/teams"}
                            list={user.meta && user.meta.team_list}
                            activeItem={activeBoard}
                            addListItem={() => (
                                <AddNewListItem urlPrefix={"/teams"} text="Create New Team" />
                            )}
                        />
                        <NavList
                            openCollapsed={this.toggleCollapse}
                            collapsed={open}
                            collapsing={collapsing}
                            iconName={"target"}
                            accordian={true}
                            title={"Workspaces"}
                            urlPrefix={"/workspace"}
                            list={boards}
                            activeItem={activeBoard}
                            addListItem={() => (
                                <AddNewListItem urlPrefix={"/workspace"} text="Create New Workspace"/>
                            )}
                        />
                    </div>
                    {
                        !open
                            ? <div className="sidenav-footer">
                                <Footer />
                            </div>
                            : ""
                    }

                    <div className="collapse-nav-btn" onClick={this.toggleCollapse}>
                        <i className={`far fa-angle-left ${open ? "flip-left" : "flip-right"}`}></i>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ user, boards }) => ({
    activeBoard: boards.activeBoard,
    user: user.user,
    boards: boards.boards
});
export default withRouter(connect(mapStateToProps, {
})(SideNav));
