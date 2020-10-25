import React from "react";
import RenderRoutes from "../RenderRoutes";

const SecureRoute = ({ route }) => (
    <RenderRoutes routes={route.routes}/>
);

export default SecureRoute;
