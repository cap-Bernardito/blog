import { useEffect } from "react";

import { loginByToken } from "features/auth/token";

import { AppRouter } from "./app-router";
import { useAppDispatch } from "./app-store";

import "./styles/index.scss";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loginByToken());
  }, [dispatch]);

  return <AppRouter />;
};
