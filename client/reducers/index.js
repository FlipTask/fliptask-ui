import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import BoardReducer from "./BoardReducer";
import OrganizationReducer from "./OrganizationReducer";
import TeamReducer from "./TeamReducer";

export default combineReducers({
    user: UserReducer,
    boards: BoardReducer,
    org: OrganizationReducer,
    team: TeamReducer
});
