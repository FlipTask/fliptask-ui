import React, { Component } from "react";
import { createPortal } from "react-dom";
import DrawerWrapper from "./DrawerWrapper";

const modalRoot = document.getElementById("root-modal");

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.element = document.createElement("div");
        this.element.classList.add("drawer--wrapper");
    }

    componentDidMount() {
        modalRoot.appendChild(this.element);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.element);
    }

    render() {
        return createPortal(
            <DrawerWrapper {...this.props}/>,
            this.element
        );
    }
}

export default Drawer;
