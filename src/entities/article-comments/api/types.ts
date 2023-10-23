import { UserDTO } from "entities/user/api/types";

export type ArticleCommentDTO = {
  id: number;
  text: string;
  articleId: number;
  profile: UserDTO;
};
