import React, { Component } from "react";
import { connect } from "react-redux";
// import { renderRoutes } from "react-router-config";
import RenderRoutes from "./components/RenderRoutes";
import { fetchUser } from "./actions";
import Routes from "./Routes";

class App extends Component {
    componentDidMount = async () => {
        // await this.props.fetchUser();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" style={{ minHeight: "100vh" }}>
                    <RenderRoutes routes={Routes} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = () => ({

});

export default connect(mapStateToProps, {
    fetchUser
})(App);
