import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCommentsList } from "widgets/article-comments-list";
import { ArticleRecommendations } from "widgets/article-recommendations";

import { GoToCategory } from "features/article/go-to-category";

import {
  type Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
  articleReducer,
  articleSelectors,
  fetchArticleData,
} from "entities/article";
import { articleCommentsReducer } from "entities/article-comments";
import { useScrollPosition } from "entities/scroll-position";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";

const asyncArticleReducer: AsyncReducersList = { article: articleReducer, articleComments: articleCommentsReducer };

export const ArticlePage = () => {
  const { id } = useParams<Article["id"]>();

  const dispatch = useAppDispatch();
  const articleData = useAppSelector(articleSelectors.selectArticleData);
  const articleError = useAppSelector(articleSelectors.selectArticleError);

  useAsyncReducerLoader(asyncArticleReducer, true);
  useScrollPosition(false, "top");

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleData(id));
    }
  }, [dispatch, id]);

  if (articleError) {
    return <div>{articleError}</div>;
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
