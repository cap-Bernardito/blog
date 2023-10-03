import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delayImportForDemo";

export const ProfilePageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "profile_page"*/ "./profile-page"), "ProfilePage"),
);
