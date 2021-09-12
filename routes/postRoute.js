const express = require("express");
const protect = require("../middleware/authMiddleware")

const { getAllPosts, createPost, getOnePost, updatePost, deletePost } = require("../controllers/postController")

const router = express.Router();

router.route("/")
    .get(getAllPosts)
    .post(protect, createPost)

router.route("/:id")
    .get(getOnePost)
    .patch(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router;