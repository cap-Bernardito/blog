/* eslint-disable @typescript-eslint/no-var-requires */
const fsPromises = require("fs").promises;
const matter = require("gray-matter");
const prettier = require("prettier");
const fg = require("fast-glob");
const parseMarkdown = require("./parse-markdown");
const nanoid = require("@reduxjs/toolkit").nanoid;

const FROM = ["../posts_md/**/*.md"];
const TO_ARTICLES = `${__dirname}/../db-parts/articles_generated.js`;
const TO_COMMENTS = `${__dirname}/../db-parts/comments_generated.js`;

const first_250_characters = (file) => {
  const excerptDraft = file.content
    .split("\n")
    .filter((item) => !item.includes("#") && item !== "")
    .slice(0, 2)
    .join(" ")
    .slice(0, 250);

  const lastWord = excerptDraft.lastIndexOf(" ");
  const excerpt = excerptDraft.slice(0, lastWord);

  file.excerpt = `${excerpt} ...`;
};

const processFiles = async () => {
  const stream = fg.globStream(FROM, { cwd: __dirname, absolute: true });
  const tasks = [];
  const postsInfo = [];

  for await (const entryPath of stream) {
    const mdPath = entryPath.replace("posts_md", "posts_js").replace(".md", ".js");
    const post = require(mdPath);

    postsInfo.push({ comments: post.comments, articleId: post.id });

    tasks.push(fsPromises.readFile(entryPath, "utf8"));
  }

  let result_comments = [];
  const result = (await Promise.all(tasks))
    .map((file, ind) => {
      let frontmatter;

      try {
        frontmatter = matter(file, { excerpt: first_250_characters });
      } catch (error) {
        console.log("Error: ", error);

        return false;
      }

      const { data, content, excerpt } = frontmatter;

      if (!data.img || !data.img.startsWith("http")) {
        return false;
      }

      const { elements } = parseMarkdown(content);

      const comments = postsInfo[ind].comments.map((text) => ({
        id: nanoid(),
        text: text,
        articleId: data.id,
        userId: data.userId,
        profileId: data.userId,
      }));

      result_comments = result_comments.concat(comments);

      return { ...data, excerpt, body: elements };
    })
    .filter(Boolean);

  const resultStringify = await prettier.format(`module.exports = ${JSON.stringify(result)};`, { parser: "babel" });
  const resultCommentsStringify = await prettier.format(`module.exports = ${JSON.stringify(result_comments)};`, {
    parser: "babel",
  });

  await fsPromises.writeFile(TO_ARTICLES, resultStringify);
  await fsPromises.writeFile(TO_COMMENTS, resultCommentsStringify);
};

processFiles();
