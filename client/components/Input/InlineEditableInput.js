import React, { Component } from "react";

class InlineEditableInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: props.edit || false
        };
    }

    onBlur = () => {
        this.setState({
            edit: false
        }, () => {
            console.log("edit disabled");
            // update the response;
        });
    }

    onClick = (e) => {
        e.preventDefault();
        console.log("edit enabled");
        this.setState({
            edit: true
        });
    }

    render() {
        const {
            editBtn = false,
            children
        } = this.props;
        return (
            <div className="editable__input" onClick={this.onClick} onBlur={this.onBlur} data-editable={this.state.edit.toString()}>
                {
                    React.Children.map(children, (child) => React.cloneElement(child, {
                        readOnly: !this.state.edit
                    }))
                }
                {
                    editBtn
                        ? <button className="edit-btn" onClick={this.onClick}>
                            <i className="fal fa-edit"/>
                        </button> : null
                }
            </div>
        );
    }
}

export default InlineEditableInput;
