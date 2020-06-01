/* eslint-disable no-unused-vars */
import React from "react";
import baseLoadble, { lazy } from "@loadable/component";
import { fetchUser, fetchBoards, changeActiveBoard } from "./actions";
import Loader from "./components/Loader";


const loadable = (func, options = {}) => baseLoadble(func, {
    ssr: true,
    fallback: <Loader/>
});

const AppContainer = loadable(() => import(
    /* webpackChunkName: "appcontainer", webpackPrefetch: true */
    "./AppContainer"
));
const Auth = loadable(() => import(
    /* webpackChunkName: "auth" */
    "./containers/Auth"
));
const CreateNewOrg = loadable(() => import(
    /* webpackChunkName: "createneworg", webpackPrefetch: true */
    "./containers/Onboard/CreateNew"
));
const Workspace = loadable(() => import(
    /* webpackChunkName: "workspace", webpackPrefetch: true */
    "./containers/Workspace/index"
));
const WorkBoard = loadable(() => import(
    /* webpackChunkName: "workboard", webpackPrefetch: true */
    "./containers/Workspace/WorkBoard"
));
const Home = loadable(() => import(
    /* webpackChunkName: "home", webpackPrefetch: true */
    "./containers/Home"
));
const TaskModal = loadable(() => import(
    /* webpackChunkName: "taskmodal", webpackPrefetch: true */
    "./components/Task/TaskModal"
));
const WorkspaceModal = loadable(() => import(
    /* webpackChunkName: "workspacemodal", webpackPrefetch: true */
    "./components/Workspace/WorkspaceModal"
));
const TeamPage = loadable(() => import(
    /* webpackChunkName: "team-page", webpackPrefetch: true */
    "./containers/Team"
));

const TeamModal = loadable(() => import(
    /* webpackChunkName: "team-modal", webpackPrefetch: true */
    "./components/Team/TeamModal"
));
export default [
    {
        component: AppContainer,
        loadData: (store) => [store.dispatch(fetchUser())],
        routes: [
            {
                path: "/",
                exact: true,
                component: Home,
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
                loadData: (store) => [store.dispatch(fetchBoards())],
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
            }, {
                exact: true,
                path: "/onboard",
                secureRoute: true,
                component: CreateNewOrg
            }, {
                path: "/login",
                component: Auth,
                exact: true
            }, {
                path: "/signup",
                component: Auth,
                exact: true
            }
        ]
    }
];
