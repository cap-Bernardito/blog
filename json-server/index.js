/* eslint-disable @typescript-eslint/no-var-requires */
// https://billyyyyy3320.com/en/2019/07/21/create-json-server-with-multiple-files/
const jsonServer = require("json-server");
const dotenv = require("dotenv");
const db = require("./db.js")();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

dotenv.config();

const PORT = Number(process.env.SERVER_PORT);

const server = jsonServer.create();

server.use(
  jsonServer.rewriter({
    "/profile/:id": "/profiles/:id",
  }),
);

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const { users = [] } = db;

    const userFromBd = users.find((user) => user.username === username && user.password === password);

    if (userFromBd) {
      const { accessToken, ...user } = userFromBd;

      const session = {
        accessToken,
        user,
      };

      return res.json(session);
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

let cacheTags;
// Эндпоинт тегов статей
server.get("/articles-categories", (req, res) => {
  try {
    const { articles = [] } = db;

    if (!cacheTags) {
      const tags = {};

      articles.forEach(({ type }) => {
        type.forEach((tag) => {
          if (tag in tags) {
            tags[tag] += 1;
          } else {
            tags[tag] = 1;
          }
        });
      });

      const sortedTabs = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 10);

      cacheTags = Object.fromEntries(sortedTabs);
    }

    return res.json(cacheTags);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "AUTH ERROR" });
  }

  next();
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
