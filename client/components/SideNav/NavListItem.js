import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavListItem extends Component {
    render() {
        const { listItem, active, urlPrefix } = this.props;
        return (
            <NavLink
                title={listItem.title || listItem.name}
                to={`${urlPrefix}/${listItem.id}`}
                activeClassName="active-workspace"
                className={"nav-list-item text-default"}
            >
                <span className="nav-list-item--lastactive">
                    <i className={`fas fa-circle ${active ? "text-success" : ""}`}></i>
                </span>
                <span className="nav-list-item--name ellipsis">{listItem.title || listItem.name}</span>
            </NavLink>
        );
    }
}

export default NavListItem;
