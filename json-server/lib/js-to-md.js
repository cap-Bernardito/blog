/* eslint-disable @typescript-eslint/no-var-requires */
require("dayjs/locale/ru");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const fg = require("fast-glob");
const TurndownService = require("turndown");
const htmlparser2 = require("htmlparser2");
const dayjs = require("dayjs");

const FROM = ["../posts_js/**/*.js"];

const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  preformattedCode: true,
});

const processFiles = async () => {
  const stream = fg.globStream(FROM, { cwd: __dirname, absolute: true });
  const tasks = [];

  for await (const entryPath of stream) {
    const data = require(entryPath);

    delete data.comments;

    const mdPath = entryPath.replace("posts_js", "posts_md").replace(".js", ".md");

    tasks.push([data, mdPath]);
  }

  (await Promise.all(tasks)).map(async ([file, filePath]) => {
    const mdPath = path.dirname(filePath);

    if (!fs.existsSync(mdPath)) {
      fs.mkdirSync(mdPath, { recursive: true });
    }

    const md = await jsonToMd(file);

    await fsPromises.writeFile(filePath, md);
  });
};

processFiles();

async function jsonToMd(data) {
  const randomUserId = Math.floor(Math.random() * 10 + 1);

  const frontMatterData = {
    id: data.id,
    profileId: randomUserId,
    userId: randomUserId,
    title: data.title.replace(":", "-"),
    img: data.img,
    createdAt: transformDate(data.createdAt),
    views: data.views,
    type: data.type.filter((type) => !/[+.#]/.test(type)),
    original: data.link,
    slug: data.slug,
  };

  const origToString = Array.prototype.toString;

  Array.prototype.toString = function () {
    return `[${this.join(", ")}]`;
  };

  const frontMatter = Object.entries(frontMatterData)
    .map(([title, value]) => `${title}: ${value}`)
    .concat(["---", "", ""])
    .join("\n");

  Array.prototype.toString = origToString;

  const html = parse(data.html);
  const markdown = turndownService.turndown(html);

  return "---\n" + frontMatter + markdown;
}

function parse(data) {
  let result = "";

  const parser = new htmlparser2.Parser({
    onopentag(name) {
      if (name !== "script") {
        result += `<${name}>`;
      }
    },
    ontext(text) {
      result += text.replace("<", "").replace(">", "").trim();
    },
    onclosetag(tagname) {
      if (tagname !== "script") {
        result += `</${tagname}>`;
      }
    },
  });

  parser.write(data);

  return result;
}

function transformDate(date = "2020-12-10T09:30:05+00:00") {
  return dayjs(date).locale("ru").format("DD MMM YYYY");
}
