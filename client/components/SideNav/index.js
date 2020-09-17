import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import NavList from "./NavList";
import Footer from "./Footer";
import AddNewListItem from "./AddNewListItem";
import Svg from "../Svg";
import FontLogo from "../FontLogo";
import {
    fetchBoards,
    getAllTeams
} from "../../actions";

const delay = (time) => new Promise((res) => setTimeout(res, time));
class SideNav extends Component {
    state = {
        collapsing: false,
        open: true
    }

    toggleCollapse = async () => {
        if (this.props.onCollapsing && typeof this.props.onCollapsing === "function") {
            this.props.onCollapsing(!this.state.collapsing);
        }
        this.setState({
            collapsing: !this.state.collapsing
        });
        await delay(300);
        this.setState({
            open: !this.state.open,
            collapsing: !this.state.collapsing
        }, () => {
            if (this.props.onCollapsing && typeof this.props.onCollapsing === "function") {
                this.props.onCollapsing(this.state.collapsing);
            }
            if (this.props.onEnd && typeof this.props.onEnd === "function") {
                this.props.onEnd(this.state.open);
            }
        });
    }

    fetchTeamsPage = () => {
        this.props.getAllTeams(
            this.props.teams.page + 1
        );
    }

    fetchWorkspacePage = () => {
        this.props.fetchBoards(
            this.props.boards.page + 1
        );
    }

    render() {
        const {
            activeBoard,
            boards,
            teams
        } = this.props;
        const {
            open,
            collapsing
        } = this.state;
        return (
            <React.Fragment>
                <div className={`sidenav--primary hidden-sm-down ${!open ? "collapsed-in" : ""} ${collapsing ? "collapsing" : ""}`}>
                    <Link className="sidenav-head" to="/">
                        <FontLogo fontSize="1" hideTail={this.state.collapsing || !this.state.open}/>
                    </Link>
                    <div className="sidenav-body">
                        <div className="nav-list">

                            <Link to="/" className="nav-list-heading text-light not-anchor">
                                <div className="nav-list-name">
                                    <Svg name={"home"} className="side-nav-icon" height="20" width="20"/>
                                    {
                                        !open || collapsing
                                            ? ""
                                            : <span className="nav-list-name--title">Home</span>
                                    }

                                </div>
                            </Link>

                        </div>
                        <NavList
                            openCollapsed={this.toggleCollapse}
                            collapsed={!open}
                            collapsing={collapsing}
                            iconName={"target"}
                            accordian={true}
                            title={"Workspaces"}
                            urlPrefix={"/workspace"}
                            list={boards.rows}
                            activeItem={activeBoard}
                            addListItem={() => {
                                if (boards.page < boards.page_size) {
                                    return (
                                        <div onClick={this.fetchWorkspacePage} className="link text-primary">Show more..</div>
                                    );
                                }
                                return null;
                            }}
                            addListItemButton={() => (
                                <React.Fragment>
                                    <AddNewListItem urlPrefix={"/workspace"} text="Create New Workspace"/>
                                </React.Fragment>
                            )}
                        />
                        <NavList
                            openCollapsed={this.toggleCollapse}
                            collapsed={!open}
                            collapsing={collapsing}
                            iconName={"team"}
                            accordian={true}
                            title={"Teams"}
                            urlPrefix={"/teams"}
                            list={teams.rows}
                            // activeItem={activeBoard}
                            addListItem={() => {
                                if (teams.page < teams.page_size) {
                                    return (
                                        <div onClick={this.fetchTeamsPage} className="link text-primary">Show more..</div>
                                    );
                                }
                                return null;
                            }}
                            addListItemButton={() => (
                                <AddNewListItem urlPrefix={"/teams"} text="Create New Team" />
                            )}
                        />
                    </div>
                    {
                        open
                            ? <div className="sidenav-footer">
                                <Footer />
                            </div>
                            : ""
                    }

                    <div className="collapse-nav-btn" onClick={this.toggleCollapse}>
                        <i className={`far fa-angle-left ${!open ? "flip-left" : "flip-right"}`}></i>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ user, boards, team }) => ({
    activeBoard: boards.activeBoard,
    user: user.user,
    boards: boards.boards,
    teams: team.teams
});
export default withRouter(connect(mapStateToProps, {
    fetchBoards,
    getAllTeams
})(SideNav));
