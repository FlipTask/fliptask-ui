import React, { Component } from "react";
import { withRouter } from "react-router";

class NewWorkspace extends Component {
    toggleAddBoard = () => {
        this.props.history.push(`${this.props.urlPrefix}/create-new`);
    }

    render() {
        const { text } = this.props;
        return (
            <div className="new-list--item">
                <button type="button" className="btn text-light bg-transparent" onClick={this.toggleAddBoard}>
                    <i className="far fa-plus"></i>
                    {text}
                </button>
            </div>
        );
    }
}

export default withRouter(NewWorkspace);
