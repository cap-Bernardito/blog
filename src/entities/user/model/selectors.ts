import { userRTKApi } from "../api/user-api";

export const selectMe = userRTKApi.endpoints.me.select();
