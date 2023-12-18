import type { RootState } from "app/app-store";

export const selectScrollPosition = (path: string) => (state: RootState) => state.scrollPosition.scroll[path];
