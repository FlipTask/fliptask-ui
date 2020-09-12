import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import RenderRoutes from "../../components/RenderRoutes";
import { fetchBoards } from "../../actions";
import Button from "../../components/Button";

class Workspace extends Component {
    render() {
        const {
            workspaces
        } = this.props;
        return (
            <React.Fragment>
                <RenderRoutes routes={this.props.route.routes} />
                {
                    workspaces.rows && workspaces.rows.length <= 0
                        ? <div className="autoHeight--placeholder">
                            <div className="autoHeight--placeholder_wrapper text-light text-center">
                                <div className="img-placeholder">
                                    <img src="/assets/tasks.png" />
                                </div>
                                <p>You haven&apos;t created any workspace.</p>
                                <Button
                                    text="Create New Workspace"
                                    className="bg-success floating-shadow"
                                    onClick={() => this.props.history.push("/workspace/create-new")}
                                />
                            </div>
                        </div>
                        : ""
                }
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
    fetchBoards
})(Workspace));
