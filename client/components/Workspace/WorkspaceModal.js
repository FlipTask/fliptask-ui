import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import Input from "../Input";
import DropDown from "../DropDown";
import Button from "../Button";
import { createNewBoard } from "../../actions";

class WorkspaceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create New Workspace",
            loader: false,
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

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            loader: true
        });
        const res = await this.props.createNewBoard(this.state.workspace.title);
        this.setState({
            loader: false
        });
        if (!res.error) {
            this.props.history.push(`/workspace/${res.data._id}`);
        }
    }

    onChange = (e) => {
        this.setState({
            workspace: {
                title: e.target.value
            }
        });
    }

    createNewTeam = () => {
        this.props.history.push("/teams/create-new");
    }

    render() {
        const {
            workspace,
            loader
        } = this.state;
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

export default connect(() => ({}), {
    createNewBoard
})(WorkspaceModal);
