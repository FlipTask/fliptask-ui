import React, { Component } from "react";
import { connect } from "react-redux";
import InviteBox from "../../components/InviteBox";
import {
    sendInvitation
} from "../../actions";
import { mailRegex } from "../../constants/constants";

class Invite extends Component {
    state = {
        mailList: []
    };

    onMailChange = (data = []) => {
        this.setState({
            mailList: data
        });
    }

    skipInvite = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    sendInvitation = async () => {
        const mailList = this.state.mailList.filter((el) => mailRegex.test(el));
        await this.props.sendInvitation(mailList);
        this.setState({
            skipInvitation: true
        });
        this.props.history.push("/workspace");
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="text-light-grey text-left">Invite your team</h2>
                <InviteBox
                    onChange={this.onMailChange}
                    value={this.state.mailList}
                />
                <div style={{
                    marginTop: "1em",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <button onClick={this.sendInvitation} className="btn bg-primary rounded bordered text-white shadowed"
                        type="button">
                        Invite
                    </button>
                    <a className="link back-link text-light-grey not-anchor" href="#" onClick={this.skipInvite}>
                        SKIP &gt;&gt;
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(() => ({}), {
    sendInvitation
})(Invite);
