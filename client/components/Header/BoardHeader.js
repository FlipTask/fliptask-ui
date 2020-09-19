import React, { Component } from "react";
import { connect } from "react-redux";
import UserBox from "../UserBox";
import {
    toggleSideNav
} from "../../actions";
class BoardHeader extends Component {
    render() {
        return (
            <div className="col-12 col-xs-12 col-md-12 header header--main no-padding">
                <div className="col-2 hidden-sm-up col-xs-2">
                    <button className="btn btn-transparent hamburger" onClick={this.props.toggleSideNav}>
                        <i className="far fa-bars"></i>
                    </button>
                </div>
                <div className="col-8 col-md-10 col-xs-10">
                    <UserBox view="min"/>
                </div>
            </div>
        );
    }
}
export default connect(() => ({}), {
    toggleSideNav
})(BoardHeader);
