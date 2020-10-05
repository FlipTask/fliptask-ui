import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavListItem extends Component {
    render() {
        const { listItem, active, urlPrefix } = this.props;
        return (
            <Link
                title={listItem.title || listItem.name}
                to={`${urlPrefix}/${listItem.id}`}
                className={`nav-list-item ${active ? "active-workspace" : ""}`}
            >
                <span className="nav-list-item--lastactive">
                    <i className={`fas fa-circle ${active ? "text-success" : ""}`}></i>
                </span>
                <span className="nav-list-item--name ellipsis">{listItem.title || listItem.name}</span>
            </Link>
        );
    }
}

export default NavListItem;
