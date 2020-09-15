import React, { Component } from "react";
import loadable from "@loadable/component";
import RenderRoutes from "../../components/RenderRoutes";
import FontLogo from "../../components/FontLogo";
import CopyRightFooter from "../../components/Footer/CopyRightFooter";

const Login = loadable(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ "./Login"), {
    ssr: true
    // fallback: <Loading />
});
const SignUp = loadable(() => import(/* webpackChunkName: "signup", webpackPrefetch: true */ "./SignUp"), {
    ssr: true
    // fallback: <Loading />
});

class Auth extends Component {
    render() {
        // console.log(this.props);
        return (
            <div className="page-wrapper">
                <div className="row parent-height">
                    <div className="col-md-4 hidden-md-down"
                        style={{
                            display: "flex",
                            backgroundImage: "radial-gradient(circle farthest-corner at 50% -7%,#3e4f61 0,#1e272f 70%)"
                        }}>
                        <div className="page-side-wrapper text-light-grey">
                            <FontLogo/>
                            <label className="text-light" style={{
                                marginBottom: "2em"
                            }}>Task Management System</label>
                            <p style={{
                                lineHeight: "1.7em",
                                fontWeight: "100"
                            }}>
                                A powerful, yet easy-to-use <br/>
                                application for managing <br/>
                                your project and team.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-8" style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <RenderRoutes routes={[{
                            path: "/login",
                            component: Login
                        }, {
                            path: "/signup",
                            component: SignUp
                        }]} />
                        <CopyRightFooter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;
