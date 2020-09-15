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

const Auth = loadable(() => pMinDelay(import(
    /* webpackChunkName: "auth" */
    "./containers/Auth"
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

const Home = loadable(() => pMinDelay(import(
    /* webpackChunkName: "home", webpackPrefetch: true */
    "./containers/Home"
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

const TeamPage = loadable(() => pMinDelay(import(
    /* webpackChunkName: "team-page", webpackPrefetch: true */
    "./containers/Team"
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
                component: Auth,
                exact: true
            }, {
                path: "/signup",
                component: Auth,
                exact: true
            },
            {
                path: "/",
                loadData: (store) => [store.dispatch(fetchUser())],
                component: SecureRoute,
                routes: [
                    {
                        path: "/onboard",
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
                    },
                    {
                        path: "/",
                        component: Home,
                        secureRoute: true,
                        loadData: (store) => [
                            store.dispatch(fetchBoards()),
                            store.dispatch(getAllTeams())
                        ],
                        routes: [
                            {
                                path: "/",
                                exact: true,
                                component: DetailedHome,
                                secureRoute: true
                            }, {
                                path: "/teams",
                                component: TeamPage,
                                secureRoute: true,
                                routes: [
                                    {
                                        path: "/teams/create-new",
                                        secureRoute: true,
                                        exact: true,
                                        component: TeamModal
                                    }
                                ]
                            }, {
                                path: "/workspace",
                                component: Workspace,
                                secureRoute: true,
                                routes: [
                                    {
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
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
