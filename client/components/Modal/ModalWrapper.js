import React, { Component } from "react";
import Animation from "../Animation";
import Loader from "../Loader";
import Button from "../Button";

class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    onCancel = (e) => {
        this.props.onCancel(e);
    }

    onSubmit = (e) => {
        this.props.onSubmit(e);
    }

    render() {
        const {
            title,
            disableActions,
            afterClose,
            open,
            loader
        } = this.props;
        return (
            <Animation
                show={open}
                afterClose={afterClose}
                mountAnimation="rodal-zoom-enter"
                unmountAnimation="rodal-zoom-leave"
            >
                <div className="modal">
                    <span className="cancel-btn text-light" onClick={this.onCancel}>
                        <i className="far fa-times"/>
                    </span>
                    {
                        loader
                            ? <Loader />
                            : ""
                    }
                    <div className="modal--header">
                        <p>
                            {title}
                        </p>
                    </div>
                    <div className="modal--body">
                        {
                            this.props.children
                        }
                    </div>
                    <div className="modal--footer">
                        <Button
                            text={"Cancel"}
                            onClick={this.onCancel}
                            className={`sm bg-danger floating-shadow ${disableActions ? "disabled" : ""}`}
                        />
                        <Button
                            text={"Submit"}
                            onClick={this.onSubmit}
                            className={`sm bg-neutral floating-shadow ${disableActions ? "disabled" : ""}`}
                        />
                    </div>
                </div>
            </Animation>
        );
    }
}
export default ModalWrapper;
