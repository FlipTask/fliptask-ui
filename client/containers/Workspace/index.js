import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import SideNav from "../../components/SideNav";
import RenderRoutes from "../../components/RenderRoutes";
import { fetchBoards } from "../../actions";

class Workspace extends Component {
    componentDidMount = () => {
        this.props.fetchBoards();
    }

    render() {
        const {
            workspaces,
            user
        } = this.props;
        if (!user.isAuthorised) {
            return <Redirect to="/login"/>;
        }
        return (
            <div className="page--container">
                <SideNav />
                <div className="board--wrapper">
                    {
                        workspaces.length > 0
                            ? <RenderRoutes
                                routes={this.props.route.routes}
                            />
                            : <div className="autoHeight--placeholder">
                                <div className="autoHeight--placeholder_wrapper text-light">
                                    <p>Create new workspaces</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user, boards }) => ({
    activeWorkspace: boards.activeBoard,
    workspaces: boards.boards,
    user
});

export default withRouter(connect(mapStateToProps, {
    fetchBoards
})(Workspace));
