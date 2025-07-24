# 1) Blog Management API

This is a RESTful API built using Node.js, Express.js, and PostgreSQL that allows users to register, log in (without JWT), and perform CRUD 
operations on blog posts with optional image uploads. The API follows authentication and supports file handling using `multer`.

# 2) Folder Structure
├── controllers/
│ └── authController.js
│ └── blogController.js
├── middlewares/
│ └── authMiddleware.js
├── models/
│ └── db.js
├── routes/
│ └── auth.js
│ └── blogs.js
├── uploads/
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md

# 3) API Endpoints

 # Auth Routes
| Method | Endpoint           | Description               | Body (JSON)                    |
|--------|--------------------|---------------------------|--------------------------------|
| POST   | `/api/auth/register` | Register a new user       | `{ username, email, password }`|
| POST   | `/api/auth/login`    | Log in a user             | `{ email, password }`          |

# Blog Routes
| Method | Endpoint           | Description                         | Access       |
|--------|--------------------|-------------------------------------|--------------|
| POST   | `/api/blogs/`       | Create a blog post (with image)     | Auth required |
| GET    | `/api/blogs/`       | Get all blog posts                  | Public        |
| GET    | `/api/blogs/:id`    | Get a single blog post              | Public        |
| PUT    | `/api/blogs/:id`    | Update a blog post (image optional) | Auth required |
| DELETE | `/api/blogs/:id`    | Delete a blog post                  | Auth required |

# 4) Image Upload:
- Use `multipart/form-data` with key: `image` when creating/updating blog post.
- Other fields like `title`, `content`, `userId` must be included in `form-data`.

# 5) How to Run Locally

# 1-Clone the Repo
git clone https://github.com/your-username/blog-api.git
cd blog-api
# 2-Install Dependencies
# 3-Create a .env File
      PORT=3000
      DB_USER=postgres
      DB_PASS=your_password
      DB_NAME=your_database_name

# 4-Set Up PostgreSQL Database
# 5-Start the Server
      npx nodemon server.js
# 6-Test API with Postman

