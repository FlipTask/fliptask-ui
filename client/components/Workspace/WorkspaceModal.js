import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import Input from "../Input";
import DropDown from "../DropDown";
import Button from "../Button";
import { createNewBoard, getAllTeams } from "../../actions";

class WorkspaceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create New Workspace",
            loader: false,
            workspace: {
                name: "",
                teamId: ""
            },
            selectedTeam: {}
        };
    }


    onCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack(-1);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loader: true
        });
        const res = await this.props.createNewBoard({
            ...this.state.workspace
        });
        this.setState({
            loader: false
        });
        if (!res.error) {
            this.props.history.push(`/workspace/${res.data.id}`);
        }
    }

    onChange = (e) => {
        this.setState({
            workspace: {
                name: e.target.value
            }
        });
    }

    onTeamSelection = (e) => {
        const { value } = e.target;
        this.setState({
            workspace: {
                ...this.state.workspace,
                teamId: value
            }
        });
    }

    createNewTeam = () => {
        this.props.history.push("/team/create-new");
    }

    onClickLoadTeams = () => {
        this.props.getAllTeams(1, 50);
    }

    render() {
        const {
            workspace,
            loader
        } = this.state;
        console.log(workspace);
        return (
            <Modal
                onSubmit={this.onSubmit}
                loader={loader}
                cancelBtnText={"Close"}
                submitBtnText={"Create"}
                open={true}
                onCancel={this.onCancel}
                title={this.state.title}
            >
                <div className="modal-form">
                    <div className="form-field-block">
                        <Input
                            icon="clipboard-list"
                            onChange={this.onChange}
                            className={"form-color"}
                            placeholder="Workspace Name e.g., Development, Product Roadmap, etc..."
                            type="text"
                            value={workspace.name}
                        />
                    </div>
                    <div className="form-field-block">
                        <div className="form-block" onClick={this.onClickLoadTeams}>
                            <DropDown
                                name="team"
                                className={"form-color"}
                                placeholder="Choose a team for your workspace"
                                options={this.props.teams.map((team) => ({ name: team.name, value: team.id }))}
                                onSelect={this.onTeamSelection}
                                selected={workspace.teamId}
                            />
                        </div>
                    </div>
                    <h3 className="text-center text-light">- OR -</h3>
                    <div className="form-field-block text-center">
                        <Button
                            text="CREATE NEW TEAM"
                            className="btn-primary-line floating-shadow rounded"
                            onClick={this.createNewTeam}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(({ team }) => ({
    teams: team.teams.rows
}), {
    createNewBoard,
    getAllTeams
})(WorkspaceModal);
