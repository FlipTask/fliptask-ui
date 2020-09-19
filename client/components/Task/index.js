import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TaskModal from "./TaskModal";
import Badge from "../Badge";
import {
    sortedPriorityArray,
    priorityCSSMap
} from "../../constants/PriorityMap";

class Task extends Component {
    state = {
        openModal: false,
        task: {},
        listId: ""
    }

    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        });
    }

    getModal = (task, listId) => (
        <TaskModal
            mode={"edit"}
            task={task}
            open={this.state.openModal}
            listId={listId}
            toggleModal={this.toggleModal}
            title={"Edit Task"}
        />
    )

    onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("e.type",e.type);
        // e.stopPropagation();
        this.toggleModal();
    }

    render() {
        const {
            task,
            index,
            listId,
            workspace
        } = this.props;
        // console.log(this.props);
        return (
            <React.Fragment>
                <Link
                    to={`/workspace/${workspace.id}/list/${listId}/ticket/${task.id}`}
                    className="not-anchor"
                    id={task.id}
                    index={index}
                    listid={listId}
                >
                    <div className="task-card--header">
                        <Badge
                            text={sortedPriorityArray[task.priority]}
                            className={`badge-${priorityCSSMap[sortedPriorityArray[task.priority]]} text-uppercase`}
                        />
                    </div>
                    <div className="task-card--body">
                        <p className="task-card-title">
                            {task.name}
                        </p>
                    </div>
                    <div className="task-card--footer">

                    </div>
                </Link>
            </React.Fragment>
        );
    }
}

export default withRouter(Task);
