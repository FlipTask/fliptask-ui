import React, { Component } from "react";
import { withRouter } from "react-router";
import NavListItem from "./NavListItem";
import Svg from "../Svg";

class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordian: props.accordian || false,
            open: true
        };
    }

    toggleOpen = () => {
        if (this.props.collapsed) {
            this.props.openCollapsed();
        }
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
            addListItemButton,
            addListItem,
            iconName,
            collapsed,
            collapsing
        } = this.props;
        const { accordian, open } = this.state;
        return (
            <div className={`nav-list ${open ? "active" : ""}`}>
                <div className="nav-list-heading" onClick={(e) => {
                    if (accordian) {
                        this.toggleOpen(e);
                    }
                    return false;
                }}>
                    <div className="nav-list-name">
                        <Svg name={iconName} className="side-nav-icon" height="20" width="20"/>
                        {
                            collapsing || collapsed
                                ? ""
                                : <span className="nav-list-name--title">{title}</span>
                        }

                    </div>
                    {
                        collapsing || collapsed
                            ? ""
                            : <i className={`far fa-angle-down ${open ? "flip-down" : "flip-up"}`}></i>
                    }
                </div>
                {
                    collapsing || collapsed
                        ? ""
                        : <React.Fragment>
                            {
                                this.state.open
                                    ? <div className={"nav--list"}>
                                        <div className="nav-list--wrapper">
                                            {
                                                list.map((listItem, i) => <NavListItem
                                                    active={listItem.id === activeItem.id}
                                                    listItem={listItem}
                                                    key={i}
                                                    urlPrefix={urlPrefix}
                                                />)
                                            }
                                            {
                                                addListItem
                                                    ? addListItem()
                                                    : null
                                            }
                                        </div>
                                        {addListItemButton()}
                                    </div>
                                    : ""
                            }
                        </React.Fragment>
                }

            </div>
        );
    }
}

export default withRouter(NavList);
