import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SideNav from "../../components/SideNav";
import RenderRoutes from "../../components/RenderRoutes";
import { fetchBoards, fetchUser, getAllTeams } from "../../actions";
import CopyRightFooter from "../../components/Footer/CopyRightFooter";
import Header from "../../components/Header";

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
            activeWorkspace
        } = this.props;
        const {
            sideNavOpen,
            sideNavCollapsing
        } = this.state;
        return (
            <React.Fragment>
                <Header />
                <SideNav
                    onCollapsing={this.onCollapsing}
                    onEnd={this.onEnd}
                />
                <div className="board--wrapper col-xs-12 col-sm-12 col-md-12 no-padding">
                    <div className={`${!sideNavOpen ? "collapsed-in" : ""} ${sideNavCollapsing ? "collapsing" : ""} not-side-nav`}>
                        <RenderRoutes routes={this.props.route.routes} />
                    </div>
                </div>
            </React.Fragment>
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
