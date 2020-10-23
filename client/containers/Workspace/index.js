import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchBoards } from "../../actions";
import Button from "../../components/Button";
import Dashboard from "../Home";

class Workspace extends Component {
    render() {
        const {
            workspaces
        } = this.props;
        return (
            <Dashboard>
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
            </Dashboard>
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
