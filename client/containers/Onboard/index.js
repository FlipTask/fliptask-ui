import React, { Component } from "react";
import RenderRoutes from "../../components/RenderRoutes";
import Header from "../../components/Header";
import CopyRightFooter from "../../components/Footer/CopyRightFooter";

class OnBoard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6" style={{ margin: "auto" }}>
                        <form className="login-form">
                            <RenderRoutes routes={this.props.route.routes} />
                        </form>
                    </div>
                </div>
                <CopyRightFooter />
            </React.Fragment>
        );
    }
}

export default OnBoard;
