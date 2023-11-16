import cn from "classnames";
import plural from "plural-ru";
import React from "react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { routePaths } from "app/app-router/app-router-config";

import { AppLink } from "shared/ui/app-link";
import { Avatar } from "shared/ui/avatar";

import { User } from "../../model/types/user-schema";

import css from "./user-card.module.scss";

type UserCardProps = {
  className?: string;
  avatar?: User["avatar"];
  first: User["first"];
  lastName: User["lastname"];
  age: User["age"];
  id: User["age"];
};

export const UserCard: React.FC<UserCardProps> = ({ className, avatar, first, lastName, age, id }) => {
  const userName = `${first} ${lastName}`;

  return (
    <div className={cn(css.root, className)}>
      <div className={cn(css.root__left)}>
        <Avatar url={avatar} />
      </div>
      <div className={cn(css.root__right)}>
        <div className={cn(css.title)}>
          <AppLink to={`${routePaths.users}/${id}`}>{userName}</AppLink>
        </div>
        <div className={cn(css.age)}>{plural(Number(age), "%d год", "%d года", "%d лет")}</div>
      </div>
    </div>
  );
};
