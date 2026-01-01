<!-- Auto-generated guidance for AI coding agents -->

# Copilot / AI Agent Instructions (project-specific)

Overview

- This repository is a simple static frontend + small Node.js backend used only for contact/enquiry emails.
- Frontend: static HTML files at the repository root (e.g. `index.html`, `about.html`, `courses.html`, `contact.html`, `results.html`) and CSS in `css/style.css`.
- Backend: `backend/server.js` (Express) serves a single API route `POST /enquiry` that sends email via `nodemailer`.

Quick start (developer)

- To run the backend locally:
  - cd into `backend`
  - `npm install`
  - create a `.env` file with `EMAIL_USER` and `EMAIL_PASS` (Gmail app password recommended) and optionally `PORT`.
  - `npm start` (runs `node server.js`, default port 5000)
- The frontend is static — no build step. Edit root HTML files to change content. For local testing, update the fetch URL in `contact.html` to `http://localhost:5000/enquiry`.

Important files & patterns

- `backend/package.json`: only script is `start` -> `node server.js`.
- `backend/server.js`: core behaviors:
  - `app.use(cors())` and `app.use(express.json())` so the backend accepts cross-origin JSON requests.
  - `POST /enquiry` expects JSON `{ name, phone, course }` and returns `{ message }`.
  - Uses `nodemailer` with Gmail: set `EMAIL_USER` and `EMAIL_PASS` in `backend/.env`.
- `contact.html`: client-side form with `id="enquiryForm"` that POSTs JSON to `https://YOUR-BACKEND-URL/enquiry` (placeholder). Replace with your backend URL or `http://localhost:5000/enquiry` for local testing.
- `index.html` and other pages: use Bootstrap via CDN; animations use a small IntersectionObserver script at the page bottom.

Agent guidance (what to do and how)

- When editing UI text or layout, update the corresponding root HTML file (`index.html`, `contact.html`, etc.). No bundler or templating engine is used.
- When changing contact/email behavior, edit `backend/server.js` and update `.env` examples. Keep nodemailer usage centralized in `server.js`.
- If adding new backend endpoints, follow the pattern in `server.js` (Express router-like, synchronous route handlers may use async/await and return JSON `{ message }`).
- Preserve existing CORS and `express.json()` usage to keep frontend connectivity intact.

Security & deployment notes

- `backend/.env` is required for email credentials — never commit real secrets. Use environment-specific secrets for deployments.
- Gmail: prefer App Passwords (not raw account password) and update the README or deployment notes accordingly.
- Production: host static files on any static host (GitHub Pages, Netlify, Vercel) and host backend on Node-supporting host (Heroku, Railway, VPS). Ensure correct CORS/HTTPS settings and update `contact.html` to use the production backend URL.

Examples (copy-paste)

- Request body for `POST /enquiry`:
  ```json
  { "name": "Alice", "phone": "9876543210", "course": "NEET" }
  ```
- Minimal `.env` (place in `backend/.env`):
  ```text
  EMAIL_USER=youremail@gmail.com
  EMAIL_PASS=your_app_password
  PORT=5000
  ```

What not to change without confirming with maintainers

- Do not remove the Bootstrap CDN links from HTML — UI depends on them.
- Do not change the fetch URL placeholder in `contact.html` without providing an updated backend URL.

If anything is unclear

- I updated this file from repository inspection. If there are other scripts, CI steps, or hosting details (deploy targets, DNS, or SMTP specifics), provide them and I will merge them into this guidance.

— End of instructions —
