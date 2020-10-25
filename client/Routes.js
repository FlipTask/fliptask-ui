/* eslint-disable no-unused-vars */
import React from "react";
import baseLoadble, { lazy } from "@loadable/component";
import pMinDelay from "p-min-delay";
import {
    fetchUser, fetchBoards, changeActiveBoard, getAllTeams
} from "./actions";
import Loader from "./components/Loader";

const MIN_DELAY_CHUNK = 3000;
const loadable = (func, options = {}) => baseLoadble(func, {
    ssr: true,
    fallback: <h1>Loading....</h1>
});

const AppContainer = loadable(() => pMinDelay(import(
    /* webpackChunkName: "appcontainer", webpackPrefetch: true */
    "./AppContainer"
)), MIN_DELAY_CHUNK);

const LoginPage = loadable(() => pMinDelay(import(
    /* webpackChunkName: "login-page" */
    "./containers/Auth/Login"
)), MIN_DELAY_CHUNK);

const SignupPage = loadable(() => pMinDelay(import(
    /* webpackChunkName: "signup-page" */
    "./containers/Auth/SignUp"
)), MIN_DELAY_CHUNK);

const VerifyEmailPage = loadable(() => pMinDelay(import(
    /* webpackChunkName: "verify-email-page" */
    "./containers/Auth/VerifyEmail"
)), MIN_DELAY_CHUNK);

const NotFound = loadable(() => pMinDelay(import(
    /* webpackChunkName: "notfound-page" */
    "./containers/Error/NotFound"
)), MIN_DELAY_CHUNK);

const OnBoard = loadable(() => pMinDelay(import(
    /* webpackChunkName: "createneworg", webpackPrefetch: true */
    "./containers/Onboard"
)), MIN_DELAY_CHUNK);

const Invite = loadable(() => pMinDelay(import(
    /* webpackChunkName: "invitepage", webpackPrefetch: true */
    "./containers/Onboard/Invite"
)), MIN_DELAY_CHUNK);

const CreateNew = loadable(() => pMinDelay(import(
    /* webpackChunkName: "createneworgpage", webpackPrefetch: true */
    "./containers/Onboard/CreateNew"
)), MIN_DELAY_CHUNK);

const JoinOrganisation = loadable(() => pMinDelay(import(
    /* webpackChunkName: "joinorganisation", webpackPrefetch: true */
    "./containers/Onboard/JoinOrganisation"
)), MIN_DELAY_CHUNK);

const Workspace = loadable(() => pMinDelay(import(
    /* webpackChunkName: "workspace", webpackPrefetch: true */
    "./containers/Workspace/index"
)), MIN_DELAY_CHUNK);

const WorkBoard = loadable(() => pMinDelay(import(
    /* webpackChunkName: "workboard", webpackPrefetch: true */
    "./containers/Workspace/WorkBoard"
)), MIN_DELAY_CHUNK);

const Profile = loadable(() => pMinDelay(import(
    /* webpackChunkName: "profile-page", webpackPrefetch: true */
    "./containers/Profile"
)), MIN_DELAY_CHUNK);

const DetailedHome = loadable(() => pMinDelay(import(
    /* webpackChunkName: "detailed_home", webpackPrefetch: true */
    "./containers/Home/Detail"
)), MIN_DELAY_CHUNK);

const TaskModal = loadable(() => pMinDelay(import(
    /* webpackChunkName: "taskmodal", webpackPrefetch: true */
    "./components/Task/TaskModal"
)), MIN_DELAY_CHUNK);

const WorkspaceModal = loadable(() => pMinDelay(import(
    /* webpackChunkName: "workspacemodal", webpackPrefetch: true */
    "./components/Workspace/WorkspaceModal"
)), MIN_DELAY_CHUNK);

const TeamPageWrapper = loadable(() => pMinDelay(import(
    /* webpackChunkName: "team-page-wrapper", webpackPrefetch: true */
    "./containers/Team"
)), MIN_DELAY_CHUNK);

const TeamPage = loadable(() => pMinDelay(import(
    /* webpackChunkName: "team-page", webpackPrefetch: true */
    "./containers/Team/Team"
)), MIN_DELAY_CHUNK);

const TeamModal = loadable(() => pMinDelay(import(
    /* webpackChunkName: "team-modal", webpackPrefetch: true */
    "./components/Team/TeamModal"
)), MIN_DELAY_CHUNK);

const SecureRoute = loadable(() => pMinDelay(import(
    /* webpackChunkName: "team-modal", webpackPrefetch: true */
    "./components/SecureRoute"
)), MIN_DELAY_CHUNK);

export default [
    {
        component: AppContainer,
        routes: [
            {
                path: "/login",
                component: LoginPage,
                exact: true
            }, {
                path: "/signup",
                component: SignupPage,
                exact: true
            }, {
                path: "/verify-email",
                component: VerifyEmailPage,
                exact: true
            }, {
                path: "/",
                component: SecureRoute,
                loadData: (store) => [store.dispatch(fetchUser())],
                secureRoute: true,
                routes: [
                    {
                        path: "/",
                        exact: true,
                        component: DetailedHome,
                        secureRoute: true
                    }, {
                        path: "/onboard",
                        exact: true,
                        component: SecureRoute,
                        routes: [
                            {
                                secureRoute: true,
                                component: OnBoard,
                                routes: [
                                    {
                                        secureRoute: true,
                                        path: "/onboard/create-new",
                                        exact: true,
                                        component: CreateNew
                                    },
                                    {
                                        secureRoute: true,
                                        path: "/onboard/invite",
                                        exact: true,
                                        component: Invite
                                    },
                                    {
                                        secureRoute: true,
                                        path: "/onboard/join-organisation",
                                        exact: true,
                                        component: JoinOrganisation
                                    }
                                ]
                            }
                        ]
                    }, {
                        path: "/profile",
                        exact: true,
                        secureRoute: true,
                        component: Profile
                    }, {
                        path: "/team",
                        exact: true,
                        component: TeamPageWrapper,
                        secureRoute: true
                    },
                    {
                        path: "/team/create-new",
                        secureRoute: true,
                        exact: true,
                        component: TeamModal
                    }, {
                        path: "/team/:teamId",
                        secureRoute: true,
                        exact: true,
                        component: TeamPage
                    }, {
                        path: "/workspace",
                        secureRoute: true,
                        exact: true,
                        component: Workspace
                    }, {
                        path: "/workspace/create-new",
                        secureRoute: true,
                        exact: true,
                        component: WorkspaceModal
                    }, {
                        // exact: true,
                        path: "/workspace/:workspaceId",
                        component: WorkBoard,
                        secureRoute: true,
                        loadData: (store, route, path, qParams, urlParams) => [store.dispatch(changeActiveBoard(route.params.workspaceId))],
                        routes: [
                            {
                                path: "/workspace/:workspaceId/list/:listId/ticket/:ticketId",
                                component: TaskModal,
                                secureRoute: true
                            }
                        ]
                    }
                ]
            }, {
                component: NotFound
            }
        ]
    }
];
