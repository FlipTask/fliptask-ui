import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const appName = require("../../../package.json").name;

class AuthorizedRoute extends Component {
    render() {
        const {
            route,
            extraProps,
            user
        } = this.props;
        const isAuthenticated = localStorage.getItem(`${appName}-isAuthorised`);
        // console.log(route);
        return (
            <Route
                key={route.key}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={(props) => {
                    if (isAuthenticated && (user.meta && user.meta.is_org_verified)) {
                        return route.render ? (
                            route.render({ ...props, ...extraProps, route })
                        ) : (
                            <route.component {...props} {...extraProps} route={route} />
                        );
                    } if (isAuthenticated && !(user.meta && user.meta.is_org_verified)) {
                        return <Redirect to="/onboard"/>;
                    }
                    return (<Redirect to="/login"/>);
                }}
            />
        );
    }
}

const stateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthorised,
    user: user.user
});

export default withRouter(connect(stateToProps, {})(AuthorizedRoute));
