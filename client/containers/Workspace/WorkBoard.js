import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Draggable } from "react-smooth-dnd";
import { changeActiveBoard, swapTaskCard, swapTaskList } from "../../actions";
import TaskList from "../../components/TaskList";
import NewTaskList from "../../components/TaskList/NewTaskList";
import RenderRoutes from "../../components/RenderRoutes";

class WorkBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaceId: props.match.params.workspaceId
        };
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

    onDragStart = ({ isSource, payload, willAcceptDrop }) => {
        console.log(isSource, payload, willAcceptDrop);
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
                <div className="dropable-list col-12 col-md-12">
                    <Container
                        dropClass="card-ghost-drop"
                        dragClass="card-ghost"
                        onDragStart={this.onDragStart}
                        orientation="horizontal"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: "task_list-drop-preview"
                        }}
                    >
                        {
                            workspace.task_lists && workspace.task_lists.map((t, i) => (
                                <Draggable key={t.id} className="task--list">
                                    <TaskList
                                        workspace={workspace}
                                        index={i}
                                        data={t}
                                        key={i}
                                    />
                                </Draggable>
                            ))
                        }
                        <NewTaskList />
                    </Container>
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
