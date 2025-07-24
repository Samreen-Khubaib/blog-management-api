const pool = require("../models/db");

exports.createBlog = async (req, res, next) => {
  const { title, content } = req.body;
  const authorId = req.userId;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      "INSERT INTO blogs (title, content, author_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, authorId, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  const { title, content } = req.body;
  const authorId = req.userId;
  try {
    const blog = await pool.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    if (!blog.rows.length) return res.status(404).json({ error: "Blog not found" });
    if (blog.rows[0].author_id !== authorId)
      return res.status(403).json({ error: "Not your blog" });

    const updated = await pool.query(
      "UPDATE blogs SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, content, req.params.id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const authorId = req.userId;
  try {
    const blog = await pool.query("SELECT * FROM blogs WHERE id = $1", [req.params.id]);
    if (!blog.rows.length) return res.status(404).json({ error: "Blog not found" });
    if (blog.rows[0].author_id !== authorId)
      return res.status(403).json({ error: "Not your blog" });

    await pool.query("DELETE FROM blogs WHERE id = $1", [req.params.id]);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};
