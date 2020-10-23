import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import {
    createNewOrganization
} from "../../actions";

class CreateNew extends Component {
    state = {
        name: ""
    }

    toggleCreateNew = (e) => {
        e.preventDefault();
        this.props.history.goBack(-1);
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };

    submitNewOrg = async (e) => {
        e.preventDefault();
        if (this.state.name && this.state.name.length > 3) {
            const res = await this.props.createNewOrganization(this.state.name);
            if (!res.error) {
                this.props.history.push("/onboard/invite");
            }
        }
    }

    render() {
        const { name } = this.state;
        return (
            <React.Fragment>
                <Input
                    className="rounded shadowed border-default"
                    type="text"
                    placeholder="Your Organization Name , e.g., Amazon Inc"
                    value={name}
                    onChange={this.handleOnChange}
                    name="name"/>
                <button
                    style={{
                        marginTop: "1em"
                    }}
                    className={"w-100 btn bg-primary text-white floating-shadow rounded"}
                    onClick={this.submitNewOrg}
                    type="button">
                    Create New Organization
                </button>
                <div className="row">
                    <a
                        href="#"
                        onClick={this.toggleCreateNew}
                        className="link back-link text-white">Go Back</a>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(() => ({}), {
    createNewOrganization
})(CreateNew);
