import React, { Component } from "react";
import { connect } from "react-redux";
import DropDown from "../../components/DropDown";
import {
    searchOrganization
} from "../../actions";

class JoinOrg extends Component {
    constructor(props) {
        super(props);
        this.fixedOption = {
            name: "Create New Organization",
            value: "create_new",
            alwaysVisible: true
        };
        this.state = {
            selected: {},
            options: [this.fixedOption]
        };
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };

    onSelect = (e, option) => {
        if (e.target.value === "create_new") {
            this.props.history.push("/onboard/create-new");
        } else {
            this.setState({ selected: option });
        }
    }

    onSearch = (e) => {
        this.setState({
            name: e.target.value
        }, async () => {
            const res = await this
                .props
                .searchOrganization(this.state.name);
            if (!res.error) {
                const optionList = Object.assign([], res.data).map((op) => {
                    op.value = op.id;
                    return op;
                });
                this.setState({
                    options: [
                        ...optionList,
                        this.fixedOption
                    ]
                });
            }
        });
    }

    render() {
        return (
            <DropDown
                selected={this.state.selected && this.state.selected.name}
                onChange={this.onSearch}
                onSelect={this.onSelect}
                placeholder="Search Your Organization Name , e.g., Amazon Inc"
                value={this.state.name}
                options={this.state.options}
                name="name"
                className="rounded shadowed"/>
        );
    }
}

export default connect(() => ({}), {
    searchOrganization
})(JoinOrg);
