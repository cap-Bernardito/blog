/* eslint-disable @typescript-eslint/no-var-requires */
const fsPromises = require("fs").promises;
const fm = require("front-matter");
const MarkdownIt = require("markdown-it");
const prettier = require("prettier");
const fg = require("fast-glob");

const FROM = [`articles/*.md`];
const TO = `${__dirname}/db-parts/articles.js`;

const md = new MarkdownIt();

const processFiles = async () => {
  const stream = fg.globStream(FROM, { cwd: __dirname, absolute: true });
  const tasks = [];

  for await (const entryPath of stream) {
    tasks.push(fsPromises.readFile(entryPath, "utf8"));
  }

  const result = (await Promise.all(tasks)).map((file) => {
    const { attributes, body } = fm(file);
    const html = md.render(body);

    return { ...attributes, body: html };
  });

  const resultStringify = await prettier.format(`module.exports = ${JSON.stringify(result)};`, { parser: "babel" });

  await fsPromises.writeFile(TO, resultStringify);
};

processFiles();
