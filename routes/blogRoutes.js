const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const isAuthenticated = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", isAuthenticated, upload.single("image"), blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", isAuthenticated, upload.single("image"), blogController.updateBlog);
router.delete("/:id", isAuthenticated, blogController.deleteBlog);

module.exports = router;
