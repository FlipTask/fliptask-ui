import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import Input from "../Input";
import InviteBox from "../InviteBox";
import {
    createNewTeam
} from "../../actions";

class TeamModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Create New Team",
            team: {
                name: "",
                mail_list: []
            }
        };
    }


    onCancel = (e) => {
        e.preventDefault();
        this.props.history.goBack(-1);
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            team: {
                name: e.target.value
            }
        });
    }

    onMailListChange = (e) => {
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                mail_list: e
            }
        });
    }

    onSubmit = async () => {
        const res = await this.props.createNewTeam({
            name: this.state.team.name
        });
        if (res) {
            this.props.history.goBack(-1);
        }
    }

    render() {
        const {
            team
        } = this.state;
        return (
            <Modal
                open={true}
                onCancel={this.onCancel}
                onSubmit={this.onSubmit}
                title={this.state.title}
            >
                <div className="modal-form">
                    <div className="form-field-block">
                        <Input
                            name="name"
                            icon="user-plus"
                            onChange={this.onChange}
                            className={"form-input form-color"}
                            placeholder="Enter A Team Name e.g., Backend Developers, Designers, Accounts, etc..."
                            type="text"
                            value={team.title}
                        />
                    </div>
                    <div className="form-field-block">
                        <InviteBox
                            name="email_list"
                            onChange={this.onMailListChange}
                            className="form-color"
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(({ team }) => ({
    team_list: team.teams,
    isLoading: team.isLoading,
    error: team.error
}), {
    createNewTeam
})(TeamModal);
