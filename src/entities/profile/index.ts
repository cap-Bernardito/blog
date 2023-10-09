export * as profileSelectors from "./model/selectors";
export { fetchProfileData } from "./model/services/fetch-profile-data";
export { profileActions, profileReducer } from "./model/slice/profile-slice";
export type { Profile, ProfileSchema } from "./model/types/profile";