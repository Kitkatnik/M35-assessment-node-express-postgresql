const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
    .select("users.user_email as commenter_email", knex.raw('count(*)::float'))
    .groupBy("commenter_email")
    .orderBy("commenter_email")
}

function read(commentId) {
  return knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
  .join("posts", "comments.post_id", "posts.post_id")
    .select("comment_id", "comment", "user_email as commenter_email", "post_body as commented_post")
    .where("comment_id", commentId)
    .first()
}

module.exports = {
  list,
  listCommenterCount,
  read,
};

