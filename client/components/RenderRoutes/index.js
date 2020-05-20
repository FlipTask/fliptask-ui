import React, { Component } from "react";
import {
    Switch, Route, withRouter
} from "react-router";
import { connect } from "react-redux";

class RenderRoutes extends Component {
    render() {
        const {
            routes = [],
            extraProps = {},
            switchProps = {},
            isAuthenticated
        } = this.props;
        if (!routes) {
            return null;
        }
        // const isAuthenticated = isAuthenticated;
        return (
            <Switch {...switchProps}>
                {
                    routes.map((route, i) => {
                        const { component: RequestedComponent } = route;
                        if (route.secureRoute && isAuthenticated) {
                            return <Route
                                key={route.key || i}
                                path={route.path}
                                exact={route.exact}
                                strict={route.strict}
                                component={(props) => <RequestedComponent {...props} {...extraProps} route={route} /> }
                            />;
                        }
                        return <Route
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            strict={route.strict}
                            component={(props) => {
                                if (route.render) {
                                    return route.render({ ...props, ...extraProps, route });
                                }
                                return <RequestedComponent {...props} {...extraProps} route={route} />;
                            }
                            }
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
