/* eslint-disable @typescript-eslint/no-var-requires */
const articles = require("./db-parts/articles");
const comments = require("./db-parts/comments");
const users = require("./db-parts/users");
const profile = require("./db-parts/profile");

module.exports = () => ({
  articles,
  comments,
  users,
  profile,
});