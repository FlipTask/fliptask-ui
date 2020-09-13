import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SideNav from "../../components/SideNav";
import RenderRoutes from "../../components/RenderRoutes";
import { fetchBoards, fetchUser } from "../../actions";
import BoardHeader from "../../components/Header/BoardHeader";

class Home extends Component {
    componentDidMount() {
        this.props.fetchBoards();
        this.props.fetchUser();
    }

    render() {
        const {
            activeWorkspace
        } = this.props;
        return (
            <React.Fragment>
                <SideNav />
                <div className="board--wrapper col-xs-12 col-sm-12 col-md-10 no-padding">
                    <BoardHeader board={ activeWorkspace }/>
                    <RenderRoutes routes={this.props.route.routes} />
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
    fetchUser
})(Home));
