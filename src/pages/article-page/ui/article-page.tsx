import { useParams } from "react-router-dom";

import { ArticleCommentsList } from "widgets/article-comments-list";
import { ArticleRecommendations } from "widgets/article-recommendations";

import { GoToCategory } from "features/article/go-to-category";

import { type Article, ArticleBody, ArticleFooter, ArticleHeader, articleRTKApi } from "entities/article";
import { useScrollPosition } from "entities/scroll-position";

export const ArticlePage = () => {
  const { id } = useParams<Article["id"]>();
  const { data: articleData, isError, error: articleError } = articleRTKApi.useGetArticleQuery(id);

  useScrollPosition(false, "top");

  if (isError) {
    return <div>{articleError.toString()}</div>;
  }

  const { title, createdAt, views, img, body, type, id: articleId } = articleData || {};

  return (
    <>
      <article>
        <ArticleHeader title={title} createdAt={createdAt} views={views} img={img} />
        <ArticleBody data={body} />
        <ArticleFooter>
          <GoToCategory categories={type}></GoToCategory>
        </ArticleFooter>
      </article>
      {articleId && <ArticleRecommendations type={type && type[0]} id={articleId} />}
      <ArticleCommentsList id={id} />
    </>
  );
};
