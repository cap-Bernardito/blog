import { screen } from "@testing-library/react";

import { componentRender } from "shared/lib/tests/component-render";

import { TArticleBodyOther } from "../../../model/types/article";
import { ArticleBody } from "../article-body";

const data: [Partial<TArticleBodyOther> & { tag: TArticleBodyOther["tag"] }, string?][] = [
  [{ tag: "h1" }],
  [{ tag: "h2" }],
  [{ tag: "h3" }],
  [{ tag: "h4" }],
  [{ tag: "h5" }],
  [{ tag: "h6" }],
  [{ tag: "p" }],
  [{ tag: "a" }],
  [{ tag: "div" }],
  [{ tag: "code" }],
  [{ tag: "blockquote" }],
  [{ tag: "ul", body: [{ tag: "li", body: "search_this_text", type: "unused", id: "unused" }] }],
];

describe("article-block", () => {
  it.each(data)("no-image elements", async ({ tag, body = "search_this_text" }, searchText = "search_this_text") => {
    componentRender(
      ArticleBody({
        tag,
        body,
        type: "unused",
        id: "unused",
      }),
    );

    expect(screen.queryByText(searchText)).toBeInTheDocument();
  });

  test("image elements", async () => {
    componentRender(
      ArticleBody({
        tag: "img",
        attrs: { src: "http://get.me/image", alt: "search_this_text" },
        type: "unused",
        id: "unused",
      }),
    );

    expect(screen.queryByAltText("search_this_text")).toBeInTheDocument();
  });
});
