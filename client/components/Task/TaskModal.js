import React, { Component } from "react";
import loadable from "@loadable/component";
import { connect } from "react-redux";
import Drawer from "../Drawer";
import Button from "../Button";
import Input from "../Input";
import {
    createNewTask,
    updateTask,
    uploadTaskDescriptionImages
} from "../../actions";
import DropDown from "../DropDown";
import { priority } from "../../constants/PriorityMap";
import Comment from "../Comment";

const InputEditor = loadable(() => import(
    /* webpackChunkName: "InputEditor" */ "./../Input/InputEditor"
));
const ImageUpload = loadable(() => import(
    /* webpackChunkName: "ImageUpload" */ "./../ImageUpload"
));

class TaskModal extends Component {
    constructor(props) {
        super(props);
        const { workspace } = props;
        const {
            listId, ticketId
        } = props.match.params;
        const taskList = workspace.task_lists.filter((t) => t.id === parseInt(listId, 10))[0];
        let task;
        if (ticketId === "create-new") {
            task = null;
        } else {
            [task] = taskList.tasks.filter((t) => t.id === parseInt(ticketId, 10));
        }
        this.task = task;
        this.state = {
            openModal: true,
            loader: false,
            images: [],
            disableModalActions: false,
            edit: !((task && task.id)),
            title: (task && task.id) ? task.title : "Create New Task",
            task: task || {
                taskListId: listId,
                name: "",
                description: "",
                dueDate: "",
                priority: "",
                desc_images: []
            }
        };
    }

    toggleModal = () => {
        this.setState({
            openModal: !this.state.openModal
        });
    }

    getOnlyChangedValues = () => {
        const taskKeys = this.task ? Object.keys(this.task) : [];
        return taskKeys.reduce((acc, key) => {
            if (this.state.task[key] !== this.task[key]) {
                acc[key] = this.state.task[key];
            }
            if (key === "taskListId" || key === "id") {
                acc[key] = this.state.task[key];
            }
            return acc;
        }, {});
    }

    handleOnChange = (e) => {
        const { name } = e.target;
        const { value } = e.target;
        const obj = {
            ...this.state.task
        };
        obj[name] = value;
        this.setState({
            ...this.state,
            task: obj
        });
    };

    createNewTask = async () => {
        this.setState({
            disableModalActions: true,
            loader: true
        });
        if (!this.state.task.id) { // CREATE NEW
            const res = await this.props.createNewTask({
                ...this.state.task
            });
            // console.log(res.data.taskid);
            if (this.state.images.length > 0 && !res.error) {
                await this.props.uploadTaskDescriptionImages(
                    this.state.images,
                    res.data.id
                );
            }
        } else { // EDIT
            if (this.state.images.length > 0) {
                await this.props.uploadTaskDescriptionImages(
                    this.state.images,
                    this.state.task.id
                );
            }
            this.props.updateTask({
                ...this.getOnlyChangedValues()
            });
        }
        this.setState({
            disableModalActions: false,
            loader: false,
            edit: false
        }, () => {
            // this.props.toggleModal();
        });
    }

    toggleEditMode = () => {
        this.setState({
            edit: !this.state.edit
        });
    }

    updateImages = (files = []) => {
        this.setState({
            images: files
        });
    }

    render() {
        const HeaderComponent = () => (
            <React.Fragment>
                <p className="ellipsis">
                    {this.state.task.name || this.props.name}
                </p>
                {
                    !this.state.edit
                        ? <Button
                            onClick={this.toggleEditMode}
                            className="sm btn-primary-line"
                        >
                            <i className="far fa-pencil-alt"></i> Edit Task
                        </Button>
                        : <Button
                            onClick={this.toggleEditMode}
                            className="sm btn-warning-line"
                            text="Cancel"
                        />
                }

            </React.Fragment>
        );

        const FooterComponent = () => (
            <React.Fragment>
                <Button
                    className={`btn-primary-line ${!this.state.edit ? "disabled" : ""}`}
                    onClick={this.createNewTask}
                >
                    {!this.state.task.id ? "Save" : "Update"}
                    {
                        !this.state.edit
                            ? <i className="far fa-check text-success" style={{
                                fontSize: "1.5em",
                                marginLeft: "0.6em"
                            }}></i>
                            : ""
                    }
                </Button>

            </React.Fragment>
        );
        const dueDate = new Date(this.state.task.dueDate);
        const date = this.state.task.dueDate ? `${dueDate.getFullYear()}-${dueDate.getMonth() + 1 < 10 ? "0" : ""}${dueDate.getMonth() + 1}-${dueDate.getDate() < 10 ? "0" : ""}${dueDate.getDate()}` : "";
        return (
            <React.Fragment>
                <Drawer
                    afterClose={() => this.props.history.goBack(-1)}
                    loader={this.state.loader}
                    FooterComponent={FooterComponent}
                    HeaderComponent={this.state.task.id ? HeaderComponent : null}
                    open={this.state.openModal}
                    disableActions={this.state.disableModalActions}
                    onCancel={this.toggleModal}
                    onSubmit={this.createNewTask}
                    title={this.state.title}
                >
                    <div className="row row--flex">
                        <div className="col-12 col-xs-12 col-md-8 padding-left-0">
                            <Input
                                readOnly={!this.state.edit}
                                label="Title"
                                type="Input"
                                className={`bordered-on-focus form-input rounded ${!this.state.edit ? "readOnly" : "border"}`}
                                placeholder="Title"
                                name="name"
                                value={this.state.task.name}
                                onChange={this.handleOnChange}
                            />
                            <div className="gutter-top">
                                <InputEditor
                                    readOnly={!this.state.edit}
                                    label="Description"
                                    value={this.state.task.description}
                                    onChange={this.handleOnChange}
                                    name="description"
                                    placeholder="Description"
                                />
                            </div>
                            <div className="gutter-top">
                                <ImageUpload
                                    name="desc_images"
                                    readOnly={!this.state.edit}
                                    onChange={this.updateImages}
                                    files={this.state.task.desc_images || []}
                                />
                            </div>
                            <div className="gutter-top">
                                <Comment/>
                            </div>
                        </div>
                        <div className="col-12 col-xs-12 col-md-4 padding-right-0" style={{
                            borderLeft: "var(--theme-border)"
                        }}>
                            <DropDown
                                readOnly={!this.state.edit}
                                label="Priority"
                                placeholder="Task Priority"
                                options={priority}
                                name="priority"
                                onSelect={this.handleOnChange}
                                selected={this.state.task.priority}
                                className={`bordered-on-focus form-input rounded ${!this.state.edit ? "readOnly" : "border"}`}
                            />
                            <div className="gutter-top">
                                <Input
                                    readOnly={!this.state.edit}
                                    label="Due Date"
                                    type="date"
                                    className={`bordered-on-focus form-input rounded ${!this.state.edit ? "readOnly" : "border"}`}
                                    placeholder="Due Date"
                                    name="dueDate"
                                    value={date}
                                    onChange={this.handleOnChange}
                                    pattern="\d{4}-\d{2}-\d{2}"
                                />
                            </div>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>

        );
    }
}

const mapStateToProps = ({ boards }) => ({
    workspace: boards.activeBoard
});

export default connect(mapStateToProps, {
    createNewTask,
    updateTask,
    uploadTaskDescriptionImages
})(TaskModal);
