import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/app-store";

import { Article } from "entities/article/@x/article";

import {
  ARTICLES_SORT_ORDER_LOCALSTORAGE_KEY,
  ARTICLES_SORT_TYPE_LOCALSTORAGE_KEY,
  ARTICLES_TYPE_LOCALSTORAGE_KEY,
  ARTICLES_VIEW_LOCALSTORAGE_KEY,
} from "shared/const/localstorage";
import { SyncStorage } from "shared/lib/sync-storage";

import { articlesRTKApi } from "../../api/articles-api";
import { ArticlesListStateSchema } from "../types/articles-list";

const storage = new SyncStorage().create("local");

const getInitialView = (defaultView: ArticlesListStateSchema["view"]): ArticlesListStateSchema["view"] => {
  let result = storage.get(ARTICLES_VIEW_LOCALSTORAGE_KEY);

  if (!result) {
    result = defaultView;
    storage.add(ARTICLES_VIEW_LOCALSTORAGE_KEY, result);
  }

  return result as ArticlesListStateSchema["view"];
};

const getInitialSort = () => {
  const url = new URL(window.location.href);
  const sortOrderFromUrl = url.searchParams.get("_order") as ArticlesListStateSchema["sortOrder"];
  const sortTypeFromUrl = url.searchParams.get("_sort") as ArticlesListStateSchema["sortType"];
  const typeFromUrl = url.searchParams.get("type") as ArticlesListStateSchema["type"];

  if (sortOrderFromUrl || sortTypeFromUrl || typeFromUrl) {
    return { sortOrder: sortOrderFromUrl, sortType: sortTypeFromUrl, type: typeFromUrl };
  }

  const sortOrder = (storage.get(ARTICLES_SORT_ORDER_LOCALSTORAGE_KEY) ||
    "asc") as ArticlesListStateSchema["sortOrder"];
  const sortType = (storage.get(ARTICLES_SORT_TYPE_LOCALSTORAGE_KEY) ||
    "createdAt") as ArticlesListStateSchema["sortType"];
  const type = storage.get(ARTICLES_TYPE_LOCALSTORAGE_KEY) as ArticlesListStateSchema["type"];

  return { sortOrder, sortType, type };
};

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const initialState = articlesListAdapter.getInitialState<ArticlesListStateSchema>({
  isLoading: false,
  view: "grid",
  page: 1,
  hasMore: true,
  _isInit: false,
  sortOrder: "asc",
  sortType: "createdAt",
  search: "",
  ids: [],
  entities: {},
});

export const articlesListSlice = createSlice({
  name: "articlesListSlice",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticlesListStateSchema["view"]>) => {
      state.view = action.payload;
      state.limit = action.payload === "list" ? 3 : 12;
      storage.add(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<ArticlesListStateSchema["page"]>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = getInitialView("grid");
      const { sortOrder, sortType, type } = getInitialSort();

      state.sortOrder = sortOrder;
      state.sortType = sortType;
      state.view = view;
      state.type = type;
      state.limit = view === "list" ? 3 : 12;
    },
    setSortOrder: (state, action: PayloadAction<ArticlesListStateSchema["sortOrder"]>) => {
      state.page = 1;
      state.sortOrder = action.payload;
      storage.add(ARTICLES_SORT_ORDER_LOCALSTORAGE_KEY, action.payload);
    },
    setSortType: (state, action: PayloadAction<ArticlesListStateSchema["sortType"]>) => {
      state.page = 1;
      state.sortType = action.payload;
      storage.add(ARTICLES_SORT_TYPE_LOCALSTORAGE_KEY, action.payload);
    },
    setSearch: (state, action: PayloadAction<ArticlesListStateSchema["search"]>) => {
      state.page = 1;
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<ArticlesListStateSchema["type"]>) => {
      state.page = 1;
      state.type = action.payload;
      storage.add(ARTICLES_TYPE_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(articlesRTKApi.endpoints.getArticles.matchPending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.originalArgs.replace) {
          articlesListAdapter.removeAll(state);
        }
      })
      .addMatcher(articlesRTKApi.endpoints.getArticles.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state._isInit = true;
        state.hasMore = action.payload.length === state.limit;

        if (action.meta.arg.originalArgs.replace) {
          articlesListAdapter.setAll(state, action.payload);
        } else {
          articlesListAdapter.addMany(state, action.payload);
        }
      })
      .addMatcher(articlesRTKApi.endpoints.getArticles.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // TODO: Сделать категории
    // Categories
    // .addCase(
    //   fetchArticlesCategories.fulfilled,
    //   (state, action: PayloadAction<ArticlesListStateSchema["categories"]>) => {
    //     state.categories = action.payload;
    //   },
    // );
  },
});

export const articlesAdapterSelectors = articlesListAdapter.getSelectors<RootState>(
  (state) => state.articles || articlesListAdapter.getInitialState(),
);

export const { actions: articlesActions } = articlesListSlice;
export const { reducer: articlesReducer } = articlesListSlice;
