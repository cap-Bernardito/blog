import { screen } from "@testing-library/react";

import { componentRender } from "shared/lib/tests/component-render";

import { ArticleBodyElementNoImg } from "../../../model/types/article";
import { createElementFromMeta } from "../create-element-from-meta";

const data: [Partial<ArticleBodyElementNoImg> & { tag: ArticleBodyElementNoImg["tag"] }, string?][] = [
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
      createElementFromMeta({
        tag,
        body,
        type: "unused",
        id: "unused",
      }),
    );

    expect(screen.queryByText(searchText)).toBeInTheDocument();
  });

  it("image elements", async () => {
    componentRender(
      createElementFromMeta({
        tag: "img",
        attrs: { src: "http://get.me/image", alt: "search_this_text" },
        type: "unused",
        id: "unused",
      }),
    );

    expect(screen.queryByAltText("search_this_text")).toBeInTheDocument();
  });
});
