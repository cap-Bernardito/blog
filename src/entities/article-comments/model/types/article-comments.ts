export type ArticleComment = {
  id: number;
  text: string;
  articleId: number;
  author: {
    name: string;
    avatar: string;
  };
};
