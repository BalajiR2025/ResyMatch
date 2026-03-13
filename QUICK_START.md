# ResyMatch - Quick Start Guide

## 5-Minute Setup & Run

### Step 1: Setup Backend (2 min)

Open PowerShell/Command Prompt and run:

```bash
cd h:\nlp\ project\ResyMatch

# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Django server
python manage.py runserver
```

**Expected output:**
```
Starting development server at http://127.0.0.1:8000/
```

Keep this terminal open!

---

### Step 2: Setup Frontend (2 min)

Open a NEW terminal/PowerShell:

```bash
cd h:\nlp\ project\ResyMatch\frontend

# Install dependencies (choose one)
pnpm install
# OR: npm install

# Start development server
pnpm dev
# OR: npm run dev
```

**Expected output:**
```
> ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

### Step 3: Use ResyMatch (1 min)

1. Open browser: **http://localhost:3000**
2. Upload **resume.pdf** (demo file in project)
3. Copy-paste **job_description.txt** content (demo file in project)
4. Click **"Analyze Now"**
5. See results!

---

## What Gets Displayed

### Output Sections (in order):

1. **ATS Score & Placement** - How well your resume matches the job
2. **Skill Match** - Which skills match and which are missing
3. **Similarity Score** - How similar the texts are
4. **Resume Strength** - 4-factor scoring breakdown
5. **Resume Suggestions** - How to improve
6. **Learning Roadmap** - Resources for missing skills
7. **Score Explanations** - Why these scores

---

## Key Features

✓ Upload PDF resume
✓ Paste job description
✓ Get ATS score (0-100%)
✓ See matched/missing skills
✓ Get learning resources
✓ Get improvement suggestions
✓ Dark mode support
✓ Mobile responsive

---

## Troubleshooting

### Backend won't start?
```bash
# Make sure virtual env is activated
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend won't start?
```bash
cd frontend
pnpm install  # or npm install
pnpm dev      # or npm run dev
```

### CORS error in browser?
- Make sure backend is running at http://localhost:8000
- Frontend should show demo data while loading

### File upload not working?
- Make sure PDF has extractable text
- Try the resume.pdf in the project folder

---

## Files You Should Know About

Development files in project root:
- `resume.pdf` - Example resume for testing
- `job_description.txt` - Example job description

Documentation:
- `INTEGRATION_SETUP.md` - Complete technical documentation
- `QUICK_START.md` - This file

Backend code:
- `backend/settings.py` - Django config (CORS, API settings)
- `backend/urls.py` - URL routing
- `analyzer/views.py` - API endpoint (NEW)
- `analyzer/urls.py` - API routes (NEW)
- `analyzer/nlp/` - NLP analysis modules

Frontend code:
- `frontend/.env.local` - API configuration (NEW)
- `frontend/app/page.tsx` - Main page
- `frontend/components/resy/` - UI components

---

## Architecture

```
Browser (Frontend)
    ↓
http://localhost:3000
    ↓
Next.js React App
    ↓
POST /api/analyze/
    ↓
Django Backend
    ↓
http://localhost:8000
    ↓
NLP Analysis Pipeline
    ↓
Returns JSON Results
    ↓
Browser Displays Results
```

---

## That's It!

Your resume analyzer is now ready to use. For more details, see `INTEGRATION_SETUP.md`.
