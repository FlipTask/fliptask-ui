import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SideNav from "../../components/SideNav";
import { fetchBoards, fetchUser, getAllTeams } from "../../actions";
import { AuthPage } from "../Wrappers";

class Home extends Component {
    state = {
        sideNavOpen: true,
        sideNavCollapsing: false
    }

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchBoards();
        this.props.getAllTeams();
    }

    onCollapsing = (e) => {
        this.setState({
            sideNavCollapsing: e
        });
    }

    onEnd = (e) => {
        this.setState({
            sideNavOpen: e
        });
    }

    render() {
        const {
            sideNavOpen,
            sideNavCollapsing
        } = this.state;
        return (
            <AuthPage>
                <SideNav
                    onCollapsing={this.onCollapsing}
                    onEnd={this.onEnd}
                />
                <div className="board--wrapper col-xs-12 col-sm-12 col-md-12 no-padding">
                    <div className={`${!sideNavOpen ? "collapsed-in" : ""} ${sideNavCollapsing ? "collapsing" : ""} not-side-nav`}>
                        {/* <RenderRoutes routes={this.props.route.routes} /> */}
                        { this.props.children }
                    </div>
                </div>
            </AuthPage>
        );
    }
}

const mapStateToProps = ({ user, boards }) => ({
    activeWorkspace: boards.activeBoard,
    workspaces: boards.boards,
    user
});

export default withRouter(connect(mapStateToProps, {
    fetchBoards,
    fetchUser,
    getAllTeams
})(Home));
