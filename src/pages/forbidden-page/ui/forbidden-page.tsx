import cn from "classnames";

import css from "./forbidden-page.module.scss";

import "shared/config/i18n/i18n";

export const ForbiddenPage = () => <div className={cn(css.root)}>Доступ запрещен</div>;
