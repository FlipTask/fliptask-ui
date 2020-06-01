import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import SideNav from "../../components/SideNav";
import RenderRoutes from "../../components/RenderRoutes";
import { fetchBoards } from "../../actions";
import BoardHeader from "../../components/Header/BoardHeader";
import Button from "../../components/Button";

class TeamPage extends Component {
    render() {
        const {
            workspaces,
            activeWorkspace
        } = this.props;
        return (
            <React.Fragment>
                <SideNav />
                <div className="board--wrapper">
                    <BoardHeader board={ activeWorkspace }/>
                    <RenderRoutes routes={this.props.route.routes} />
                    {
                        workspaces.length <= 0
                            ? <div className="autoHeight--placeholder">
                                <div className="autoHeight--placeholder_wrapper text-light text-center">
                                    <div className="img-placeholder">
                                        <img src="/assets/teams.png" />
                                    </div>
                                    <p>You haven't created any team.</p>
                                    <Button
                                        text="Create New Team"
                                        className="bg-primary floating-shadow"
                                        onClick={() => this.props.history.push("/teams/create-new")}
                                    />
                                </div>
                            </div>
                            : ""
                    }
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
    fetchBoards
})(TeamPage));
