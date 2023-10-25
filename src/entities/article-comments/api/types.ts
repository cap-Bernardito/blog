import { Article } from "entities/article/@x/article";
import { Session } from "entities/session/@x";
import { UserDTO } from "entities/user/api/types";

export type ArticleCommentDTO = {
  id: number;
  text: string;
  articleId: number;
  profile: UserDTO;
};

export type RequestAddCommentData = {
  articleId: Article["id"];
  userId: Session["userId"];
  profileId: Session["userId"];
  text: string;
};
