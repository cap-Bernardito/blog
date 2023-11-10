import { useEffect } from "react";

import { sessionActions } from "entities/session";

import { AppRouter } from "./app-router";
import { useAppDispatch } from "./app-store";

import "./styles/index.scss";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sessionActions.initSession());
  }, [dispatch]);

  return <AppRouter />;
};
