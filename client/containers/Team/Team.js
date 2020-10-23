import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../../components/ProfileCard";
import DashBoard from "../Home";
import {
    getTeam
} from "../../actions";

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: props.match.params.teamId
        };
    }

    componentDidMount() {
        this.props.getTeam(
            this.state.teamId
        );
    }

    render() {
        const { members } = this.props;
        return (
            <DashBoard>
                <div className="row card-group-grid">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((member, i) => <UserCard data={members[0] || {}} key={i}/>)
                    }
                </div>
            </DashBoard>
        );
    }
}

const mapStateToProps = ({ team }) => ({
    members: team.active.members
});
export default connect(mapStateToProps, {
    getTeam
})(Team);
