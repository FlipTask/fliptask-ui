import React, { Component } from "react";
import { withRouter } from "react-router";
import Button from "../Button";

class NewTaskButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    toggleModal = () => {
        const { listId, workspace } = this.props;
        this.props.history.push(`/workspace/${workspace.id}/list/${listId}/ticket/create-new`);
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    type="button"
                    className="btn-primary-line shadowed"
                    onClick={this.toggleModal}
                >
                    <i className="fal fa-plus" aria-hidden="true"></i>
                    Add New Task
                </Button>
            </React.Fragment>
        );
    }
}


export default withRouter(NewTaskButton);
