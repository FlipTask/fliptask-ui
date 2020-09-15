import React, { Component } from "react";
import { connect } from "react-redux";
import InfoCard from "../../components/InfoCard";

class Detail extends Component {
    render() {
        const {
            workspaceList,
            teamList
        } = this.props;
        return (
            <div className="row">
                <div className="col-12 col-md-12">
                    <h2>Workspaces</h2>
                </div>
                <div className="row">
                    {
                        workspaceList.rows.map((w, i) => (
                            <InfoCard to={`/workspace/${w.id}`} title={w.name} icon={"lock"} isPublic={w.public} key={i}/>
                        ))
                    }
                    <div className="col-12 col-md-4">
                        <div className="link text-primary">Show more..</div>
                    </div>
                </div>
                <div className="col-12 col-md-12">
                    <hr/>
                </div>
                <div className="col-12 col-md-12">
                    <h2>Teams</h2>
                </div>
                <div className="row">
                    {
                        teamList.rows.map((w, i) => (
                            <InfoCard to={`/team/${w.id}`} title={w.name} icon={"lock"} isPublic={w.public} key={i}/>
                        ))
                    }
                    <div className="col-12 col-md-4">
                        <div className="link text-primary">Show more..</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ boards, team }) => ({
    workspaceList: boards.boards,
    teamList: team.teams
}), {})(Detail);
