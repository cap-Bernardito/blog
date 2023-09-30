import { useEffect } from "react";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/sidebar";
import { userActions } from "entities/user";
import { AppRouter } from "./app-router";
import { useAppDispatch } from "./app-store";
import "./styles/index.scss";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="content">
        <Sidebar className="content__sidebar" />
        <AppRouter />
      </div>
    </>
  );
};
