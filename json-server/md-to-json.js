/* eslint-disable @typescript-eslint/no-var-requires */
const fsPromises = require("fs").promises;
const fm = require("front-matter");
const prettier = require("prettier");
const fg = require("fast-glob");
const parseMarkdown = require("./parse-markdown");

const FROM = [`articles/*.md`];
const TO = `${__dirname}/db-parts/articles.js`;

const processFiles = async () => {
  const stream = fg.globStream(FROM, { cwd: __dirname, absolute: true });
  const tasks = [];

  for await (const entryPath of stream) {
    tasks.push(fsPromises.readFile(entryPath, "utf8"));
  }

  const result = (await Promise.all(tasks)).map((file) => {
    const { attributes, body } = fm(file);
    const { elements } = parseMarkdown(body);

    return { ...attributes, body: elements };
  });

  const resultStringify = await prettier.format(`module.exports = ${JSON.stringify(result)};`, { parser: "babel" });

  await fsPromises.writeFile(TO, resultStringify);
};

processFiles();
