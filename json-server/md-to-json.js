/* eslint-disable @typescript-eslint/no-var-requires */
const fsPromises = require("fs").promises;
const matter = require("gray-matter");
const prettier = require("prettier");
const fg = require("fast-glob");
const parseMarkdown = require("./parse-markdown");

const FROM = [`articles/*.md`];
const TO = `${__dirname}/db-parts/articles.js`;

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

  for await (const entryPath of stream) {
    tasks.push(fsPromises.readFile(entryPath, "utf8"));
  }

  const result = (await Promise.all(tasks)).map((file) => {
    const { data, content, excerpt } = matter(file, { excerpt: first_250_characters });
    const { elements } = parseMarkdown(content);

    return { ...data, excerpt, body: elements };
  });

  const resultStringify = await prettier.format(`module.exports = ${JSON.stringify(result)};`, { parser: "babel" });

  await fsPromises.writeFile(TO, resultStringify);
};

processFiles();
