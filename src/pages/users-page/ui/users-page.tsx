import { useEffect } from "react";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { UserCard } from "entities/user";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Loader } from "shared/ui/loader/loader";

import { allUsersReducer } from "../model/slice/all-users-slice";
import { allUsersSelectors, fetchAllUsers } from "..";

import css from "./user-page.module.scss";

const asyncAllUsersReducer: AsyncReducersList = { allUsers: allUsersReducer };

export const UsersPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(allUsersSelectors.selectData);
  const error = useAppSelector(allUsersSelectors.selectError);
  const isLoading = useAppSelector(allUsersSelectors.selectIsLoading);

  useAsyncReducerLoader(asyncAllUsersReducer, true);

  useEffect(() => {
    const promise = dispatch(fetchAllUsers());

    return () => promise.abort();
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const userList =
    users &&
    users.map((user) => (
      <UserCard
        key={user.id}
        avatar={user.avatar}
        first={user.first}
        lastName={user.lastname}
        age={user.age}
        id={String(user.id)}
        className={css.userlist__item}
      />
    ));

  return (
    <article>
      <h1 className="page-title">Все пользователи</h1>

      {userList}
    </article>
  );
};
