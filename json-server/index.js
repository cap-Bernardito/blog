/* eslint-disable @typescript-eslint/no-var-requires */
// https://billyyyyy3320.com/en/2019/07/21/create-json-server-with-multiple-files/
const jsonServer = require("json-server");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./db.js")();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

dotenv.config();

const PORT = Number(process.env.SERVER_PORT);

const server = jsonServer.create();

server.use(cookieParser());

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
server.post("/auth/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const { users = [] } = db;

    const userFromBd = users.find((user) => user.username === username && user.password === password);

    if (userFromBd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, refreshToken, password, ...user } = userFromBd;

      const session = {
        accessToken,
        user,
      };

      res.cookie("token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/auth/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      return res.json(session);
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Эндпоинт для logout
server.get("/auth/logout", (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    path: "/auth/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.json({ status: "OK" });
});

// Эндпоинт для получения текущего пользователя
server.get("/auth/me", (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "AUTH ERROR" });
    }

    const [, accessToken] = req.headers.authorization.split("Bearer").map((i) => i.trim());
    const { users = [], profiles = [] } = db;
    const userFromBd = users.find((user) => user.accessToken === accessToken);

    if (!userFromBd) {
      return res.status(401).json({ message: "AUTH ERROR" });
    }

    const userInfo = profiles.find((user) => user.id === userFromBd.id);

    if (!userInfo) {
      return res.status(401).json({ message: "AUTH ERROR" });
    }

    return res.json(userInfo);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// Эндпоинт для токена
// TODO: добавить генерацию токенов
server.get("/auth/token", (req, res) => {
  try {
    const refreshToken = req.cookies.token;

    if (!refreshToken) {
      return res.status(401).json({ message: "AUTH ERROR" });
    }

    const { users = [] } = db;
    const userFromBd = users.find((user) => user.refreshToken === refreshToken);

    if (userFromBd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, refreshToken, password, ...user } = userFromBd;

      const session = {
        accessToken,
        user,
      };

      res.cookie("token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/auth/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      return res.json(session);
    }

    return res.status(401).json({ message: "AUTH ERROR" });
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

      const sortedTabs = Object.entries(tags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

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
    return res.status(401).json({ message: "AUTH ERROR" });
  }

  const [, accessToken] = req.headers.authorization.split("Bearer").map((i) => i.trim());
  const { users = [] } = db;
  const userFromBd = users.find((user) => user.accessToken === accessToken);

  if (!userFromBd) {
    return res.status(401).json({ message: "AUTH ERROR" });
  }

  next();
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
