import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../Input/index";
import {
    createNewTaskList
} from "../../actions";

class NewTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpen: false,
            task_list: {
                title: ""
            }
        };
        this.element = null;
    }

    componentDidMount() {
        this.element = document.getElementById("new-task-list-placeholder");
    }

    resetState() {
        this.setState({
            isFormOpen: false,
            task_list: {
                title: ""
            }
        });
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {
            ...this.state.task_list
        };
        obj[name] = value;
        this.setState({
            ...this.state,
            task_list: obj
        });
    };

    createTaskList = async () => {
        console.log("this.props.boardId", this.props.boardId);
        const board = this.props.boardId;
        if (this.state.task_list.title.length > 0) {
            await this.props.createNewTaskList({
                ...this.state.task_list,
                board
            });
            this.toggleForm();

            // eslint-disable-next-line no-unused-expressions
            this.element && this.element.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }

    toggleForm = () => {
        this.setState({
            isFormOpen: !this.state.isFormOpen,
            task_list: {
                title: ""
            }
        });
    }

    render() {
        return (
            <div className="task-list--wrapper">
                <div className="task-list" id="new-task-list-placeholder">
                    {
                        !this.state.isFormOpen
                            ? <button
                                type="button"
                                onClick={this.toggleForm}
                                className="btn md btn-success rounded card-shadow"
                                style={{
                                    fontWeight: "600",
                                    margin: "0.5em 1em"
                                }}
                            >
                                <i className="fas fa-plus" aria-hidden="true"></i>
                                Create New List
                            </button>
                            : <div className="create-new-list-form">
                                <Input
                                    className="form-input bordered shadowed rounded"
                                    placeholder="List Name"
                                    type="text"
                                    name="title"
                                    value={this.state.task_list.title}
                                    onChange={this.handleOnChange}
                                />
                                <div>
                                    <button
                                        onClick={(e) => this.createTaskList(e, this.props.boardId)}
                                        type="button"
                                        className="btn sm btn-success shadowed rounded">Create</button>
                                    <button
                                        onClick={this.toggleForm}
                                        style={{ marginLeft: "1em" }}
                                        type="button"
                                        className="btn sm btn-danger shadowed rounded">Cancel</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ boards }) => ({
    boardId: boards.activeBoard.id
});

export default connect(mapStateToProps, {
    createNewTaskList
})(NewTaskList);
