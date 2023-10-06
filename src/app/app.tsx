import { useEffect } from "react";

import { userActions } from "entities/user";

import { AppRouter } from "./app-router";
import { useAppDispatch } from "./app-store";

import "./styles/index.scss";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return <AppRouter />;
};
