import React, { Component } from "react";
import Loader from "../Loader";
import Button from "../Button";
import DelayedPortal from "../DelayedPortal";

class Modal extends Component {
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
            open,
            loader,
            afterClose,
            submitBtnText,
            cancelBtnText
        } = this.props;
        return (
            <DelayedPortal
                isOpen={open}
                openDelay={300}
                closeDelay={300}
                afterClose={afterClose}
            >
                {({ isOpen, willOpen, willClose }) => (
                    <div className={`
                        modal--wrapper
                        ${isOpen ? "open" : "closed"}
                        ${willOpen ? "will-open" : ""}
                        ${willClose ? "will-close" : ""}
                    `}>
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
                                    text={cancelBtnText || "Cancel"}
                                    onClick={this.onCancel}
                                    className={`sm btn-danger-line floating-shadow ${disableActions ? "disabled" : ""}`}
                                />
                                <Button
                                    text={submitBtnText || "Submit"}
                                    onClick={this.onSubmit}
                                    className={`sm btn-neutral-line floating-shadow ${disableActions ? "disabled" : ""}`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </DelayedPortal>
        );
    }
}
export default Modal;
