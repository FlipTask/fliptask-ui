import React, { Component } from "react";

const Card = ({ data }) => (
    <div className="card">
        <div className="card--header">
            <h3>{data.title}</h3>
        </div>
        <div className="card--body">

        </div>
    </div>
);

class WorkspaceList extends Component {
    render() {
        const { boards } = this.props;
        return (
            <div className="workspace--list">
                {
                    boards.map((board, i) => <Card data={board} key={i}/>)
                }
            </div>
        );
    }
}

export default WorkspaceList;
