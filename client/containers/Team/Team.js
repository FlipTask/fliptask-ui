import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "../../components/ProfileCard";
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
            <div className="row card-group-grid">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((member, i) => <UserCard data={members[0] || {}} key={i}/>)
                }
            </div>
        );
    }
}

const mapStateToProps = ({ team }) => ({
    members: team.active.members
});
export default connect(mapStateToProps, {
    getTeam
})(Team);
