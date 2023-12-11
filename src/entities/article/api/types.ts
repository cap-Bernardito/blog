import { UserDTO } from "entities/user/@x";

import { ArticleBodyElement } from "../model/types/article";

export type ArticleDTO = {
  id: number;
  profile: UserDTO;
  title: string;
  excerpt: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  body: ArticleBodyElement[];
};
