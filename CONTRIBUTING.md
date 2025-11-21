# Contributing to Nexus.io

Welcome to the team! This document details the standards and workflows we use to keep our codebase clean, our `main` branch stable, and our collaboration smooth.

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **Git**

### 1. Clone & Install

```bash
git clone <REPO_URL>
cd hackathon-prep
npm install  # Installs dependencies for root, client, and server
```

### 2\. Environment Setup

Create a `.env` file in the `server/` directory:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/hackathon_db"
```

### 4\. Run the App

We use `concurrently` to run both Client and Server from the root:

```bash
# From the root folder
npm run dev
```

- **Frontend:** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
- **Backend:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

---

## 🌳 Git Workflow

We follow a **Feature-Branch Workflow**.

### Branch Structure

| Branch        | Status       | Description                                                                     |
| :------------ | :----------- | :------------------------------------------------------------------------------ |
| `main`        | 🔴 Protected | **Production Code.** Do not push here directly. Only merges from `development`. |
| `development` | 🟡 Staging   | **Integration Branch.** All features merge here first.                          |
| `feature/*`   | 🟢 Active    | **Your Workspace.** Create a new branch for every task.                         |

### Naming Convention

- **General Feature:** `feature/voice-input`
- **Bug Fix:** `fix/login-error`
- **Documentation:** `docs/update-readme`

### 🔀 Frontend/Backend Splitting

For large features, we work in parallel. Use these suffixes:

- **Backend API:** `feature/<name>-be` (e.g., `feature/tasks-be`)
- **Frontend UI:** `feature/<name>-fe` (e.g., `feature/tasks-fe`)

**⚠️ Important Rule:**
The **Backend (`-be`)** branch must be merged into `development` **BEFORE** the Frontend (`-fe`) branch is merged. This prevents the UI from breaking due to missing API endpoints.

---

## 🚀 How to Contribute (Step-by-Step)

### 1\. Sync Up

Always start by pulling the latest code to avoid conflicts.

```bash
git checkout development
git pull origin development
```

### 2\. Create a Branch

```bash
git checkout -b feature/my-new-feature
```

### 3\. Develop

- **Backend:** Work inside `server/`. Remember to update `server/routes` and `server/controllers`.
- **Frontend:** Work inside `client/`. Use `client/src/types` for TypeScript definitions.

### 4\. Commit

Write clear, descriptive commit messages.

```bash
git add .
git commit -m "feat(auth): implement JWT token verification"
```

### 5\. Push & Pull Request

```bash
git push origin feature/my-new-feature
```

1.  Go to GitHub.
2.  Click **"Compare & pull request"**.
3.  Change **Base** to `development` (NOT `main`).
4.  Request a review from a teammate.

### 6\. Merge

Once approved, merge your PR into `development`.

---

## 🗄️ Database Changes

Since we are using raw SQL with Postgres:

1.  If you modify the database schema (e.g., add a table), you **must** create a script or provide the SQL command in the PR description.
2.  Communicate schema changes to the team immediately so they can run the update locally.

---

## 🧪 Coding Standards

- **No `any` types:** We use TypeScript for a reason. Define interfaces in `types/`.
- **No Hardcoded URLs:** Always use `/api/...` relative paths in the client so the Proxy works.
- **Clean Console:** Remove `console.log` debugging statements before pushing.

Happy Coding\! 🚀
