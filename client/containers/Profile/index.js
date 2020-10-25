import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthPage } from "../Wrappers";
import {
    Input,
    Button
} from "../../components";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            user: props.user || {}
        };
    }

    onEdit = () => {
        this.setState({
            ...this.state,
            edit: !this.state.edit
        });
    }

    render() {
        const { user, edit } = this.state;
        return (
            <AuthPage>
                <div className="col-12 col-xs-12 col-md-8" style={{ margin: "auto" }}>
                    <div className="row gutter-top">
                        <div className="col-12 col-xs-12 col-md-3">
                            <div className="img-placeholder">
                                <img src="/assets/avatars/256px/1.png" alt={`${user.firstName} ${user.lastName}`} className="round"/>
                            </div>
                            <h4 className="title text-center">{user.firstName} {user.lastName}</h4>
                        </div>
                        <div className="col-12 col-xs-12 col-md-9" style={{
                            borderLeft: "var(--theme-border)"
                        }}>
                            <div className="row">
                                <div className="col-12 col-xs-12 col-md-12 text-right">
                                    {
                                        !edit
                                            ? <Button className="rounded sm btn-default-line" onClick={this.onEdit}>Edit</Button>
                                            : <React.Fragment>
                                                <Button className="rounded sm btn-warning-line" onClick={this.onEdit}>Cancel</Button>
                                                <Button className="rounded sm btn-primary-line" onClick={this.onEdit} style={{ marginLeft: "1em" }}>Save</Button>
                                            </React.Fragment>

                                    }
                                </div>
                            </div>
                            <div className="row">
                                <h4 className="col-12 col-xs-12 col-md-12" style={{ marginTop: 0 }}>Basic Info</h4>
                            </div>
                            <div className="row">
                                <div className="col-12 col-xs-12 col-md-6 gutter-top">
                                    <Input type="text" label="First Name" name="firstName" value={user.firstName} className="rounded" readOnly={!edit}/>
                                </div>
                                <div className="col-12 col-xs-12 col-md-6 gutter-top">
                                    <Input type="text" label="Last Name" name="lastName" value={user.lastName} className="rounded" readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="row gutter-top">
                                <div className="col-12 col-xs-12 col-md-12">
                                    <Input iconClassName="fas text-success verified-icon" icon="badge-check" iconPosition="right" className="rounded" label="Primary Email" placeholder="Add a primary email id" value={user.email} readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="row gutter-top">
                                <div className="col-xs-12 col-12 col-md-12">
                                    <Input className="rounded" label="Secondary Email" placeholder="Add a secondary email id" value={user.secondaryEmail} readOnly={!edit}/>
                                </div>
                            </div>
                            <div className="row gutter-top">
                                <h4 className="col-12 col-xs-12 col-md-12">About Me</h4>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-12 col-md-12">
                                    <Input type="textarea" className="rounded" label="Bio" placeholder="Add a small bio about yourself..." value={user.bio} readOnly={!edit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthPage>
        );
    }
}

export default connect(({ user }) => ({
    user: user.user
}), {})(Profile);
