import React, { Component } from "react";
import Loader from "../Loader";
import DelayedPortal from "../DelayedPortal";

class DrawerWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.heightFactor = 0;
    }

    onCancel = (e) => {
        this.props.onCancel(e);
    }

    onSubmit = (e) => {
        this.props.onSubmit(e);
    }

    render() {
        const {
            loader = false,
            title,
            disableActions,
            open,
            HeaderComponent,
            FooterComponent,
            afterClose
        } = this.props;
        return (
            <DelayedPortal
                isOpen={open}
                openDelay={300}
                closeDelay={300}
                afterClose={afterClose}
            >
                {({ isOpen, willOpen, willClose }) => (
                    <React.Fragment>
                        <div role="dialog" className={`drawer--wrapper ${isOpen ? "open" : "closed"} ${willOpen ? "will-open" : ""} ${willClose ? "will-close" : ""}`}
                        />
                        <div className={`drawer ${isOpen ? "md" : ""} ${willOpen ? "drawer-slide-in" : ""} ${willClose ? "drawer-slide-out" : ""}`}
                        >
                            {
                                !isOpen || loader
                                    ? <Loader />
                                    : ""
                            }
                            <div className="drawer--header">
                                {
                                    HeaderComponent
                                        ? <HeaderComponent />
                                        : <p className="text-light-grey">
                                            {title}
                                        </p>
                                }
                                <span
                                    className="drawer-cancel-btn text-light"
                                    onClick={this.onCancel}
                                >
                                    <i className="fal fa-times"></i>
                                </span>
                            </div>
                            <div className="drawer--body"
                            >
                                {
                                    this.props.children
                                }
                            </div>
                            <div className="drawer--footer">
                                {
                                    FooterComponent
                                        ? <FooterComponent />
                                        : <button className={`btn btn-primary-line rounded shadowed ${disableActions ? "disabled" : ""}`} onClick={this.onSubmit}>Submit</button>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </DelayedPortal>
        );
    }
}
export default DrawerWrapper;
