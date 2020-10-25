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
                                    } if (
                                        props.match.url.indexOf("/onboard") < -1
                                            && isAuthenticated
                                            && user.organisations.length === 0
                                    ) {
                                        return <Redirect to="/onboard/create-new" />;
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
                                    if (user.organisations.length === 0) {
                                        return <Redirect to="/onboard/create-new" />;
                                    }
                                    return <Redirect to="/" />;
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
