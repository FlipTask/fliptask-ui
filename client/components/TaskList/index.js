import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Draggable } from "react-smooth-dnd";
import NewTaskButton from "../Task/NewTaskButton";
import Task from "../Task";
import TaskCardPlaceHolder from "../Task/TaskCardPlaceHolder";
import {
    getTaskListById
} from "../../actions";

class TaskList extends Component {
    render() {
        const {
            data = {},
            dropableTasks,
            index,
            workspace
        } = this.props;
        return (
            <React.Fragment>
                <div className="drop-list dragable-list task-list--wrapper col-12 col-md-6"
                    listid={data.id}
                    index={index}
                >
                    <div className="task-list">
                        <div className="task-list--header">
                            <p className="task-list--title ellipsis">{data.name}</p>
                            <span className="task-list--options-btn"><i className="far fa-ellipsis-v text-light"></i></span>
                        </div>
                        <div className="task-list--body">
                            <Container
                                groupName="col"
                                dropPlaceholder={{
                                    animationDuration: 150,
                                    showOnTop: true,
                                    className: "drop-preview"
                                }}
                                orientation={"vertical"}
                                dropPlaceholderAnimationDuration={200}
                            >
                                {
                                    data.tasks && data.tasks.length === 0
                                        ? <TaskCardPlaceHolder />
                                        : data.tasks && data.tasks.map((task, i) => (
                                            <Draggable key={i} className="task-card card-shadow">
                                                <Task
                                                    workspace={workspace}
                                                    dropableTasks={dropableTasks}
                                                    listId={data.id}
                                                    index={i}
                                                    task={task}
                                                />
                                            </Draggable>
                                        ))
                                }
                            </Container>
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
