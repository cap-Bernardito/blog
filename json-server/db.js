/* eslint-disable @typescript-eslint/no-var-requires */
const articles = require("./db-parts/articles_generated");
const comments = require("./db-parts/comments_generated");
const users = require("./db-parts/users");
const profiles = require("./db-parts/profile");

module.exports = () => ({
  articles,
  comments,
  users,
  profiles,
});
