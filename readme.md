# Personal Portfolio Website

## Project Overview

A **personal portfolio website** built using **Next.js**, **TypeScript**, **Tailwind CSS**, **Express.js**, and **Prisma (PostgreSQL)**.

The project features both **public** and **private** sections, with secure authentication for the portfolio owner, dynamic blog and project management, and optimized performance using **ISR/SSG** rendering strategies.

---

## Core Features

### Public Pages

- **Blog Management (Read-Only for Visitors):**
    - View all blog posts.
    - View individual blog details.
    - Implemented using **ISR (Incremental Static Regeneration)** and `generateStaticPrams + revalidate`.
- **About Me Section:**
    - Static personal details such as name, contact info, and bio.
    - Uses **SSG (Static Site Generation)** for performance.
- **Project Showcase:**
    - Displays project thumbnail, description, live link, and features.
    - Uses **ISR** for dynamic updates.

---

### Private Pages (Owner Only)

- **Authentication & Authorization:**
    - Secure JWT-based login system.
    - Passwords hashed with **bcrypt**.
    - Admin user seeded in database.
- **Dashboard:**
    - Private admin dashboard for managing blogs and projects (Create, Update, Delete).
    - Accessible only to authenticated owner.

---

## Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Express.js, Node.js |
| Database | PostgreSQL with Prisma ORM |
| Authentication | JWT, bcrypt |
| Notifications | react-hot-toast |
| Optional | React Quill (Rich Text Editor) |

---

## Installation & SetupBackend Setup

### Backend Setup

```bash
git clone https://github.com/emonpappu17/portfolio-server.git
cd portfolio-server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

### Frontend Setup

```bash
git clone https://github.com/emonpappu17/portfolio-client.git
cd portfolio-client
cp .env.local.example .env.local
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES=your_exprires_date
BCRYPT_SALT_ROUND=your_bcrypt_round

PORT=4000

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_password
ADMIN_NAME=your_name

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```
NEXT_PUBLIC_BASE_API=http://localhost:4000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

---

## Database & Seeding

- Prisma is used for database modeling and migrations.
- A **default admin user** is seeded for authentication testing.

**Example Credentials:**

```
Email: owner@example.com
Password: StrongPassword123
```

## **Live & Repo Links**

- **Frontend Live:**  [https://your-frontend.vercel.app](https://portfolio-client-liard.vercel.app/)
- **Backend Live:**  [https://api.your-backend.com](https://portfolio-server-fawn-tau.vercel.app/)
- **Frontend Repo:**  https://github.com/emonpappu17/portfolio-client
- **Backend Repo:**  https://github.com/emonpappu17/portfolio-server