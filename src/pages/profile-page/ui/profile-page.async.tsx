import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const ProfilePageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "profile_page"*/ "./profile-page"), "ProfilePage"),
);
