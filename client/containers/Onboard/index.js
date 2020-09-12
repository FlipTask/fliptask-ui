import React, { Component } from "react";
import RenderRoutes from "../../components/RenderRoutes";
import Header from "../../components/Header";

class OnBoard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="page-wrapper row">
                    <Header/>

                    <div className="column page-side-wrapper">
                        <div style={{
                            width: "50%",
                            margin: "auto"
                        }}>
                            <form className="login-form">
                                <RenderRoutes routes={this.props.route.routes} />
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OnBoard;
