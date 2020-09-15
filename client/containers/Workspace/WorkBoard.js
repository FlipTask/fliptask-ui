import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { changeActiveBoard, swapTaskCard, swapTaskList } from "../../actions";
import TaskList from "../../components/TaskList";
import NewTaskList from "../../components/TaskList/NewTaskList";
import DropableList from "./DropableList";
import RenderRoutes from "../../components/RenderRoutes";

class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaceId: props.match.params.workspaceId
        };
        this.dropableTasks = new DropableList({
            expandType: "vertical",
            placeholder: {
                className: "task-card task-card-placeholder"
            },
            source: {
                item: {
                    className: "dragable",
                    activeClassName: "active-task-card-item"
                }
            },
            target: {
                container: {
                    className: "task-list--wrapper"
                }
            }
        });
        this.dropableList = new DropableList({
            expandType: "horizontal",
            placeholder: {
                className: "task-list--wrapper"
            },
            source: {
                item: {
                    className: "dragable-list"
                }
            },
            target: {
                container: {
                    className: "dropable-list"
                }
            }
        });
    }

    componentDidMount() {
        const { workspace } = this.props;
        if (workspace.id !== this.state.workspaceId) {
            this.props.changeActiveBoard(this.state.workspaceId);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.match.params.workspaceId !== state.workspaceId) {
            props.changeActiveBoard(props.match.params.workspaceId);
            return {
                ...state,
                workspaceId: props.match.params.workspaceId
            };
        }
        return null;
    }

    onMouseMove = (e) => {
        this.dropableTasks.onMouseMove(e);
    }

    onMouseUp = (e) => {
        this.dropableTasks.onMouseUp(e, (ins) => {
            this.props.swapTaskCard({
                to: {
                    listid: ins.currentTargetList.getAttribute("listid"),
                    index: ins.targetIndex
                },
                from: {
                    listid: ins.sourceElement.getAttribute("listid"),
                    taskid: ins.sourceElement.getAttribute("id")
                }
            });
        });
    }

    onMouseLeave = (e) => {
        this.dropableTasks.onMouseLeave(e);
    }

    onMouseEnter = (e) => {
        this.dropableTasks.onMouseEnter(e);
    }

    onMouseDown = (ev) => {
        this.dropableTasks.onMouseDown(ev);
    }

    render() {
        const {
            workspace
        } = this.props;
        return (

            <React.Fragment>

                <RenderRoutes routes={this.props.route.routes} />
                <h2 className="text-light-grey"
                    style={{
                        padding: "0.6em 1em",
                        fontWeight: "300",
                        margin: "0"
                    }}
                >{workspace.name}</h2>
                <div className="container-fluid dropable-list"
                    onMouseMove={(e) => {
                        this.onMouseMove(e);
                        this.dropableList.onMouseMove(e);
                    }}
                >
                    {
                        workspace.task_lists && workspace.task_lists.map((t, i) => (
                            <TaskList
                                workspace={workspace}
                                index={i}
                                data={t}
                                key={i}
                                swapTaskList={this.props.swapTaskList}
                                dropableList={this.dropableList}
                                dropableTasks={this.dropableTasks}
                                mouseEvents={{
                                    onMouseMove: this.onMouseMove,
                                    onMouseDown: this.onMouseDown,
                                    onMouseEnter: this.onMouseEnter,
                                    onMouseLeave: this.onMouseLeave,
                                    onMouseOver: this.onMouseOver,
                                    onMouseUp: this.onMouseUp
                                }}
                            />
                        ))
                    }
                    <NewTaskList />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ boards }) => ({
    workspace: boards.activeBoard
});

export default withRouter(connect(mapStateToProps, {
    changeActiveBoard,
    swapTaskCard,
    swapTaskList
})(WorkBoard));
