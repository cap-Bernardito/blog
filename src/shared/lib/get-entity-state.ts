import { EntityState } from "@reduxjs/toolkit";

export const getEntityState = <T>(data: EntityState<T> | undefined) => data || { ids: [], entities: {} };
