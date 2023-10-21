export * as articleSelectors from "./model/selectors";
export { fetchArticleData } from "./model/services/fetch-article-data";
export { articleReducer } from "./model/slice/article-slice";
export type { ArticleStateSchema } from "./model/types/article";
export { type Article } from "./model/types/article";
export { ArticleBody } from "./ui/article-body/article-body";
export { ArticleFooter } from "./ui/article-footer/article-footer";
export { ArticleHeader } from "./ui/article-header/article-header";
