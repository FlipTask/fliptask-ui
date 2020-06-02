import React, { Component } from "react";
import { withRouter } from "react-router";
import NavListItem from "./NavListItem";

class NavList extends Component {
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            accordian: props.accordian || false,
            open: true
        };
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {
            title = "",
            list = [],
            urlPrefix = "",
            activeItem = {},
            addListItem
        } = this.props;
        const { accordian, open } = this.state;
        return (
            <div className={`nav-list ${open ? "active" : ""}`}>
                <div className="nav-list-heading text-light" onClick={(e) => {
                    if (accordian) {
                        this.toggleOpen(e);
                    }
                    return false;
                }}>
                    <span>{title}</span>
                    <i className={`far fa-angle-down ${open ? "rotate-clockwise" : "rotate-anticlockwise"}`}></i>
                </div>
                {
                    this.state.open
                        ? <div className={"nav--list"}>
                            <div className="nav-list--wrapper">
                                {
                                    list.map((listItem, i) => <NavListItem
                                        active={listItem._id === activeItem._id}
                                        listItem={listItem}
                                        key={i}
                                        urlPrefix={urlPrefix}
                                    />)
                                }
                            </div>
                            {addListItem()}
                        </div>
                        : ""
                }
            </div>
        );
    }
}

export default withRouter(NavList);
