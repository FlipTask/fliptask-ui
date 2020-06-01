import React, { Component } from "react";
import Modal from "../Modal";
import Input from "../Input";
import DropDown from "../DropDown";
import Button from "../Button";

class WorkspaceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create New Workspace",
            workspace: {
                title: ""
            }
        };
        console.log("I AM WORKSPACE MODAL");
    }


    onCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack(-1);
    }

    onChange = () => {

    }

    createNewTeam = () => {
        this.props.history.push("/teams/create-new");
    }

    render() {
        const {
            workspace
        } = this.state;
        return (
            <Modal
                open={true}
                onCancel={this.onCancel}
                title={this.state.title}
            >
                <div className="modal-form">
                    <div className="form-field-block">
                        <Input
                            icon="clipboard-list"
                            onChange={this.onChange}
                            className={"bordered-on-focus form-input border form-color"}
                            placeholder="Workspace Name e.g., Development, Product Roadmap, etc..."
                            type="text"
                            value={workspace.title}
                        />
                    </div>
                    <div className="form-field-block">
                        <DropDown
                            name="team"
                            onSelect={this.onChange}
                            className={"bordered-on-focus form-input border form-color"}
                            placeholder="Choose a team for your workspace"
                            // value={[]}
                            selected={{}}
                        />
                    </div>
                    <h3 className="text-center text-light">- OR -</h3>
                    <div className="form-field-block text-center">
                        <Button
                            text="CREATE NEW TEAM"
                            className="bg-awesome floating-shadow"
                            onClick={this.createNewTeam}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default WorkspaceModal;
