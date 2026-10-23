# MERN Stack Developer Portfolio

A responsive portfolio built with **Next.js (App Router), React, Tailwind CSS** on the frontend and
**Node.js, Express, MongoDB (Mongoose)** on the backend. It has a working contact form and a client
review system with owner approval.

## Features
- Sections in order: Navbar, Hero, About, Skills, Services, Projects, Testimonials, Contact, Footer
- Active-section navbar, mobile menu, scroll progress bar, back-to-top button
- Project category filters; links are disabled until you add real URLs
- Client reviews: submitted by visitors, saved as **pending**, shown publicly only after you approve them
- Contact form saved to MongoDB
- Validation (client and server), rate limiting, honeypot spam trap, Helmet, restricted CORS

## Folder structure
```
backend/   Express API (server.js, routes/, controllers/, middleware/, models/, config/)
frontend/  Next.js site (app/, components/, data/, lib/, public/)
```
Important files:
- `frontend/data/portfolioData.js` - ALL your personal info, skills, services, projects, links
- `frontend/lib/api.js` - every call from the website to the backend
- `backend/models/Review.js` - review schema (default status: pending)
- `backend/middleware/validateInput.js` - server-side validation
- `backend/middleware/requireAdminKey.js` - protects the approval endpoints

## Requirements (Windows)
1. Node.js LTS (https://nodejs.org) - check with `node -v` and `npm -v`
2. VS Code and Git
3. A MongoDB database: free MongoDB Atlas cluster (https://www.mongodb.com/atlas) or local MongoDB

## Setup in PowerShell
Open the project folder in VS Code (File > Open Folder), then open two terminals (Terminal > New Terminal).

**Terminal 1 - backend**
```powershell
cd backend
npm install
Copy-Item .env.example .env
notepad .env
npm run dev
```
Fill in `.env`:
| Variable | Required | Meaning |
|---|---|---|
| `MONGODB_URI` | Yes | Your MongoDB connection string |
| `ADMIN_API_KEY` | Yes, to moderate reviews | Random string, 32+ characters |
| `PORT` | No | Default 5000 |
| `FRONTEND_URL` | No | Default http://localhost:3000 (CORS allows only this) |

Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

MongoDB Atlas: create a free cluster, add a database user, under Network Access allow your IP,
then Connect > Drivers > copy the connection string into `MONGODB_URI` (replace `<password>`).

You should see `MongoDB connected.` Check `http://localhost:5000/api/health` in the browser.

**Terminal 2 - frontend**
```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
npm run dev
```
Open http://localhost:3000. Other commands: `npm run lint`, `npm run build`, `npm start`.

## Edit your content
- Name, bio, skills, services, projects, contact details, social links: `frontend/data/portfolioData.js`
- Portrait: put a file in `frontend/public/images/` and set `profile.portrait` (e.g. `"/images/portrait.jpg"`)
- Resume: put a PDF in `frontend/public/documents/` and set `profile.resumePath`; empty hides the button
- Add a project: copy one object in the `projects` array and change it. Empty `githubUrl`/`demoUrl` disables that button
- Everything marked PLACEHOLDER (education, location, phone, email) must be replaced by you
- Icons are generic Lucide icons, not official brand logos. To use official logos, add SVG files to
  `public/images/` and edit `components/ui/iconMap.js` / `SkillCard.js`

## Reviews: submit, approve, publish
1. On the site click **Leave a Review** and submit. It is saved as `pending` and NOT shown.
2. List pending reviews (PowerShell, replace the key):
```powershell
$h = @{ "x-admin-key" = "YOUR_ADMIN_API_KEY" }
(Invoke-RestMethod http://localhost:5000/api/admin/reviews?status=pending -Headers $h).reviews
```
3. Approve (use the `_id` from step 2):
```powershell
Invoke-RestMethod -Method Patch http://localhost:5000/api/admin/reviews/REVIEW_ID -Headers $h `
  -ContentType "application/json" -Body '{"status":"approved"}'
```
Use `"rejected"` to hide one. Delete: `Invoke-RestMethod -Method Delete http://localhost:5000/api/admin/reviews/REVIEW_ID -Headers $h`
4. Refresh the website: only approved reviews appear. Emails are never returned by the public API.

If `ADMIN_API_KEY` is empty or shorter than 32 characters, the admin endpoints refuse all requests.
There is no admin web page; moderation is done with these protected API calls.

## API
| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | public | Server check |
| GET | `/api/reviews?page=1&limit=10` | public | Approved reviews, newest first, with total and average rating |
| POST | `/api/reviews` | public, 5/hour/IP | Submit review (saved as pending) |
| POST | `/api/contact` | public, 5/hour/IP | Send contact message |
| GET | `/api/admin/reviews?status=pending` | admin key | List reviews |
| PATCH | `/api/admin/reviews/:id` | admin key | Set status |
| DELETE | `/api/admin/reviews/:id` | admin key | Delete review |

If MongoDB is not connected, write/read endpoints return 503 and the site shows an error; nothing is faked as saved.

## Data and privacy
Reviews store name, email, project, rating and text. Email is for your verification only and is never public.
Delete data on request with the admin DELETE endpoint. Contact messages live in the `contactmessages`
collection; delete them in Atlas when no longer needed. Reviews are not verified; approve only ones you recognise.

## Email notifications (Nodemailer, optional)
When someone sends a contact message or submits a review, the backend can email you.
The message is **always saved to MongoDB first**; if the email fails, the visitor still sees success
and the failure is only logged on the server. Contact emails use "Reply-To" set to the visitor,
so you can just press Reply.

Turn it on by setting all of these in `backend/.env` (leave empty to keep email off):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your-16-character-app-password
ADMIN_NOTIFY_EMAIL=yourgmail@gmail.com
```
Gmail setup: turn on 2-Step Verification, then create an **App Password**
(Google Account > Security > App passwords) and use it as `SMTP_PASS`. Do not use your normal password.
Other providers (Brevo, Mailgun SMTP, Outlook) work with their SMTP host, port and login.
Port 465 uses SSL; 587 uses STARTTLS.

Then run `npm install` again inside `backend` (it adds `nodemailer`) and restart the backend.
Send a test message from the website and check your inbox (and Spam folder).
In MongoDB, `notificationSent: true` on a contact message means the email really went out.

The frontend needs no change: it only calls the API. SMTP credentials must never be placed in the frontend.

## Troubleshooting
- `npm` not recognized: reinstall Node.js, then restart VS Code
- `MongoDB connection failed`: check the URI/password and Atlas Network Access IP list
- Site shows "Reviews could not be loaded": backend not running, or `NEXT_PUBLIC_API_URL` wrong
- CORS error: `FRONTEND_URL` in `backend/.env` must exactly match the site address
- PowerShell blocks scripts: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- Port in use: change `PORT` or close the other program

## Publish to GitHub
```powershell
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```
`.gitignore` already excludes `node_modules`, `.env` and `.env.local`. Never commit real keys.

## Deploy
- **Database:** MongoDB Atlas (allow your host's IPs, or 0.0.0.0/0 with a strong password)
- **Backend:** Render, Railway or similar. Root dir `backend`, build `npm install`, start `npm start`.
  Set `MONGODB_URI`, `ADMIN_API_KEY`, `FRONTEND_URL` (your final site URL)
- **Frontend:** Vercel or Netlify. Root dir `frontend`. Set `NEXT_PUBLIC_API_URL` (backend URL) and `NEXT_PUBLIC_SITE_URL`
- Deploy the backend first, then the frontend, then update `FRONTEND_URL` and redeploy the backend
