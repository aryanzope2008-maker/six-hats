# Six Thinking Hats — AI Learning Assistant in Classrooms

A single-page site walking through Case Scenario 1 (an AI-powered personalized
learning assistant proposed for college-wide use) using Edward de Bono's Six
Thinking Hats: Blue (process), White (facts), Red (feelings), Black (caution),
Yellow (benefits), and Green (alternatives), ending on a Blue Hat decision.

Plain HTML/CSS/JS, no build step, no framework, no backend.

## Structure

```
.
├── index.html        the whole page, one section per hat
├── css/style.css      styling, colors, layout, animations
├── js/script.js        hero canvas animation + scroll-tracking side rail
├── render.yaml        Render static-site blueprint
└── .gitignore
```

## Run it locally

Just open `index.html` in a browser — or, for a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put it on GitHub

```bash
git init
git add .
git commit -m "Six Thinking Hats case analysis site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy on Render

**Option A — Blueprint (automatic, uses `render.yaml`)**
1. Push this repo to GitHub (above).
2. In the Render dashboard: **New → Blueprint**.
3. Connect the repo. Render reads `render.yaml` and sets everything up as a
   Static Site automatically.
4. Click **Apply** — it deploys in under a minute.

**Option B — Manual static site**
1. In the Render dashboard: **New → Static Site**.
2. Connect this GitHub repo.
3. Build Command: leave blank.
4. Publish Directory: `.`
5. Click **Create Static Site**.

Either way, Render gives you a live `*.onrender.com` URL, and redeploys
automatically on every push to `main`.

## Editing content

All the copy for each hat lives in `index.html`, inside the matching
`<section class="hat-section" id="...">` block. Colors per hat are CSS
variables at the top of `css/style.css` (`--blue`, `--red`, etc.) — change
one there and every element tied to that hat updates.
