export * as userApi from "./api/user-api";
export * as userSelectors from "./model/selectors";
export { fetchUserData } from "./model/services/fetch-user-data";
export { updateUserData } from "./model/services/update-user-data";
export { userActions, userReducer } from "./model/slice/user-slice";
export type { User, UserStateSchema } from "./model/types/user";
