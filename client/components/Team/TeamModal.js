import React, { Component } from "react";
import Modal from "../Modal";
import Input from "../Input";
import InviteBox from "../InviteBox";

class TeamModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create New Team",
            team: {
                title: ""
            }
        };
    }


    onCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack(-1);
    }

    onChange = () => {

    }

    render() {
        const {
            team
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
                            icon="user-plus"
                            onChange={this.onChange}
                            className={"bordered-on-focus form-input border form-color"}
                            placeholder="Enter A Team Name e.g., Backend Developers, Designers, Accounts, etc..."
                            type="text"
                            value={team.title}
                        />
                    </div>
                    <div className="form-field-block">
                        <InviteBox
                            className="form-color"
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default TeamModal;
