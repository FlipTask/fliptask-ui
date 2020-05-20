import React, { Component } from "react";
import Animation from "../Animation";
import NavListItem from "./NavListItem";

class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordian: props.accordian || false,
            open: (props.accordian === true || props.accordian === "true") ? (props.open || false) : true
        };
    }

    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {
            title,
            list,
            urlPrefix,
            activeItem,
            AddListItem
        } = this.props;
        const { accordian, open } = this.state;
        return (
            <div className="nav-list">
                <div className="nav-list-heading text-light" onClick={(e) => {
                    if (accordian) {
                        this.toggleOpen(e);
                    }
                    return false;
                }}>{title}</div>
                <Animation show={open} mountAnimation="slideDownOpen" unmountAnimation="slideUpClose">
                    <div className={"nav--list"}>
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
                        <AddListItem/>
                    </div>
                </Animation>
            </div>
        );
    }
}

export default NavList;
