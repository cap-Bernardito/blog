import { userApi, UserCard } from "entities/user";

import { Loader } from "shared/ui/loader/loader";

import css from "./user-page.module.scss";

export const UsersPage = () => {
  const { data: users, isLoading, isSuccess, isError, error } = userApi.useAllUsersQuery();

  let userList;

  if (isLoading) {
    userList = <Loader />;
  } else if (isSuccess) {
    userList = users.map((user) => (
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
  } else if (isError) {
    userList = <div>{error.toString()}</div>;
  }

  return (
    <article>
      <h1 className="page-title">Все пользователи</h1>

      {userList}
    </article>
  );
};
