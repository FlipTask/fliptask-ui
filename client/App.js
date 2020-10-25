import React, { Component } from "react";
import { connect } from "react-redux";
// import { renderRoutes } from "react-router-config";
import RenderRoutes from "./components/RenderRoutes";
import { fetchUser } from "./actions";
import Routes from "./Routes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme
        };
    }

    static getDerivedStateFromProps(newProps, state) {
        if (newProps.theme !== state.theme) {
            document.body.setAttribute("data-theme", newProps.theme);
            return {
                theme: newProps.theme
            };
        }
        return null;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <RenderRoutes routes={Routes} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ app }) => ({
    theme: app.theme
});

export default connect(mapStateToProps, {
    fetchUser
})(App);
