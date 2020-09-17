import React, { Component } from "react";
import { connect } from "react-redux";
import NewTaskButton from "../Task/NewTaskButton";
import Task from "../Task";
import TaskCardPlaceHolder from "../Task/TaskCardPlaceHolder";
import {
    getTaskListById
} from "../../actions";

class TaskList extends Component {
    onMouseUp = (e) => {
        this.props.dropableList.onMouseUp(e, (instance) => {
            this.props.swapTaskList(this.props.workspace.id, {
                index: instance.targetIndex,
                id: instance.sourceElement.getAttribute("listid")
            });
        });
    }

    render() {
        const {
            data = {},
            mouseEvents,
            dropableTasks,
            dropableList,
            index,
            workspace
        } = this.props;
        return (
            <React.Fragment>
                <div className="drop-list dragable-list task-list--wrapper col-12 col-md-6"
                    listid={data.id}
                    onMouseDown={(e) => dropableList.onMouseDown(e)}
                    onMouseLeave={(e) => dropableList.onMouseLeave(e)}
                    onMouseUp={(e) => this.onMouseUp(e)}
                    index={index}
                >
                    <div className="task-list">
                        <div className="task-list--header">
                            <p className="task-list--title ellipsis">{data.name}</p>
                            <span className="task-list--options-btn"><i className="far fa-ellipsis-v text-light"></i></span>
                        </div>
                        <div className="task-list--body">
                            {
                                data.tasks && data.tasks.length === 0
                                    ? <TaskCardPlaceHolder />
                                    : data.tasks && data.tasks.map((task, i) => <Task
                                        workspace={workspace}
                                        dropableTasks={dropableTasks}
                                        listId={data.id}
                                        mouseEvents={mouseEvents}
                                        index={i}
                                        key={i}
                                        task={task}
                                    />)
                            }
                        </div>
                        <div className="task-list--footer">
                            <NewTaskButton listId={data.id} workspace={workspace}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default connect(() => ({}), {
    getTaskListById
})(TaskList);
