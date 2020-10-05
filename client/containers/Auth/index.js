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
                {/* <svg style={{
                    width: "100%"
                }} preserveAspectRatio="none" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 857">
                    <defs>
                        <path d="M0 892.505c308.829 32.498 548.829 7.536 720-74.885 171.171-82.422 411.171-104.978 720-67.668V0H0v892.505z" id="a" />
                    </defs>
                    <g id="Page-1" fill="none" fillRule="evenodd">
                        <g id="Homepage-Copy">
                            <g id="Group-7" transform="translate(-56 -94)">
                                <g id="Group">
                                    <path d="M13 959.24c338.228 31.295 603.188-5.678 794.879-110.919 191.69-105.24 456.548-139.277 794.575-102.109L1621 208 37.542 247.031 13 959.241z" id="Path-Copy" fill="#E8F4FD" transform="rotate(2 817 589)"/>
                                    <g id="Color-/-Brand-/-50" transform="translate(56)">
                                        <mask id="b" fill="#fff">
                                            <use xlinkHref="#a"></use>
                                        </mask>
                                        <use id="Mask" fill="#018EF5" xlinkHref="#a"></use>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg> */}
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
                    <div className="col-12 col-xs-12 col-md-8" style={{
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
