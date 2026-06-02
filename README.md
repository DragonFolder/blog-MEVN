# CatFruit Blog

A full-stack MEVN (MongoDB, Express, Vue, Node) blog application. Users can register, log in, and browse posts; post authors and admins can edit posts, and admins can delete them.

## 🌐 Live Demo

**[https://blog-mevn-orpin.vercel.app/](https://blog-mevn-orpin.vercel.app/)**

Log in with one of the demo accounts below to try it out.

> ⏳ **Note:** The API is hosted on Render's free tier, which spins down after periods of inactivity. The first request (e.g. logging in) may take **30–60 seconds** while the server wakes up. Subsequent requests are fast.

## 🔑 Demo Accounts

You can log in with the following demo accounts to try the app:

| Role  | Email            | Password    |
| ----- | ---------------- | ----------- |
| Admin | `admin@mail.com` | `admin123`  |
| User  | `user@mail.com`  | `12345678`  |

- **Admin** — can create posts, edit any post, and delete posts (trash icon on the feed).
- **User** — can create posts and edit their own posts.

## Features

- User registration and JWT-based authentication
- Feed of all posts, newest first
- View a single post with author and date
- Create, edit, and delete posts (with author/admin permission checks)

## Tech Stack

- **Frontend:** Vue 3 (`<script setup>`), Vue Router, Pinia, Bootstrap, Vite
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Auth:** JSON Web Tokens (JWT)

## Project Structure

```
.
├── client/   # Vue 3 front end (Vite)
└── server/   # Express API
```

## Running Locally

### Backend (`server/`)

1. `cd server`
2. `npm install`
3. Create a `.env` file with:
   ```
   MONGODB_STRING=<your MongoDB connection string>
   JWT_SECRET_KEY=<your secret>
   PORT=3000
   ```
4. `npm start` (or `node index.js`)

### Frontend (`client/`)

1. `cd client`
2. `npm install`
3. Create a `.env` file with the API base URL:
   ```
   VITE_API=http://localhost:3000
   ```
4. `npm run dev`

Then open the URL Vite prints (e.g. `http://localhost:5173`).
