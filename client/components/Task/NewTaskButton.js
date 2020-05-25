import React, { Component } from "react";
import { withRouter } from "react-router";

class NewTaskButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        }, () => {
            if (this.state.openModal) {
                const { listId, workspace } = this.props;
                this.props.history.push(`/workspace/${workspace._id}/list/${listId}/ticket/create-new`);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn text-primary shadowed rounded" onClick={this.toggleModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Add New Task
                </button>
            </React.Fragment>
        );
    }
}


export default withRouter(NewTaskButton);
