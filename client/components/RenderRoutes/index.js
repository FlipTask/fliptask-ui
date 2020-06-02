import React, { Component } from "react";
import {
    Switch, Route, withRouter, Redirect
} from "react-router";
import { connect } from "react-redux";

class RenderRoutes extends Component {
    render() {
        const {
            user,
            routes = [],
            extraProps = {},
            switchProps = {},
            isAuthenticated
        } = this.props;
        if (!routes) {
            return null;
        }
        return (
            <Switch {...switchProps}>
                {
                    routes.map((route, i) => {
                        const { component: RequestedComponent } = route;
                        if (route.secureRoute) {
                            return <Route
                                key={route.key || i}
                                path={route.path}
                                exact={route.exact}
                                strict={route.strict}
                                render={(props) => {
                                    if (!isAuthenticated) {
                                        return <Redirect to="/login" />;
                                    }
                                    return <RequestedComponent {...props} {...extraProps} route={route} />;
                                }}
                            />;
                        }
                        return <Route
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            strict={route.strict}
                            render={(props) => {
                                if (route.render) {
                                    return route.render({ ...props, ...extraProps, route });
                                }
                                if ((props.match.path === "/login" || props.match.path === "/signup") && isAuthenticated) {
                                    if (user.meta && !user.meta.is_org_verified) {
                                        return <Redirect to="/onboard" />;
                                    }
                                    return <Redirect to="/workspace" />;
                                }
                                return <RequestedComponent {...props} {...extraProps} route={route} />;
                            }}
                        />;
                    })
                }
            </Switch>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthorised,
    user: user.user
});

export default withRouter(connect(mapStateToProps, {})(RenderRoutes));
