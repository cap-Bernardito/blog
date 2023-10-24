import plural from "plural-ru";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { fetchUserData, userReducer, userSelectors } from "entities/user";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Avatar } from "shared/ui/avatar";
import { Skeleton } from "shared/ui/skeleton";

import css from "./user-page.module.scss";

const asyncUserReducer: AsyncReducersList = { user: userReducer };

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.selectData);
  const error = useAppSelector(userSelectors.selectError);

  useAsyncReducerLoader(asyncUserReducer, true);

  useEffect(() => {
    const promise = dispatch(fetchUserData(Number(id)));

    return () => promise.abort();
  }, [dispatch, id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <article>
      <h1 className="page-title">Информация о пользователе</h1>

      <div className={css.userinfo}>
        <div className={css.userinfo__avatar}>
          <Avatar url={user?.avatar} size="xl" />
        </div>

        <ul className={css.userinfo__list}>
          <li>
            <span>Имя пользователя:</span> {user?.username || <Skeleton style={{ width: "150px" }} />}
          </li>
          <li>
            <span>Имя:</span> {user?.first || <Skeleton style={{ width: "150px" }} />}
          </li>
          <li>
            <span>Фамилия:</span> {user?.lastname || <Skeleton style={{ width: "150px" }} />}
          </li>
          <li>
            <span>Возраст:</span>
            {user?.age ? (
              plural(Number(user.age), "%d год", "%d года", "%d лет")
            ) : (
              <Skeleton style={{ width: "150px" }} />
            )}
          </li>
          <li>
            <span>Страна:</span> {user?.country || <Skeleton style={{ width: "150px" }} />}
          </li>
        </ul>
      </div>
    </article>
  );
};
