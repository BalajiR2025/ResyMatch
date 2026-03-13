# ResyMatch Architecture & Integration Overview

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                  http://localhost:3000                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                   HTTP/HTTPS (AJAX)
                             │
        ┌────────────────────▼────────────────────┐
        │    Next.js Frontend Application          │
        │  (React Components + Tailwind CSS)       │
        └────────────────────┬────────────────────┘
                             │
                    Frontend Features:
        ├─ File Drop Zone (PDF Upload)
        ├─ Text Area (Job Description)
        ├─ Analyze Button & Loading State
        ├─ Theme Toggle (Dark/Light)
        ├─ Responsive Layout
        └─ Error Handling
                             │
                    POST /api/analyze/
                  multipart/form-data
                             │
        ┌────────────────────▼────────────────────┐
        │   Django REST API Backend                │
        │  (Django 6.0 + DRF + CORS)               │
        │  http://localhost:8000                   │
        │                                          │
        │  /api/analyze/ Endpoint:                 │
        │  ├─ Receives: resume (PDF), JD (text)   │
        │  ├─ Validates input                     │
        │  ├─ Extracts PDF text                   │
        │  └─ Calls NLP Pipeline                  │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │  NLP Analysis Pipeline                   │
        │  (analyzer/nlp/final_pipeline.py)        │
        └────────────────────┬────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐       ┌──────▼──────┐     ┌─────▼────┐
    │ Resume  │       │ Job        │     │ Matching │
    │ Parser  │       │ Description│     │ Engine   │
    │         │       │ Parser     │     │          │
    │ Extract │       │ Extract    │     │ Find     │
    │ Text    │       │ Text       │     │ skills   │
    │ from    │       │ from JD    │     │ overlaps │
    │ PDF     │       │            │     │ & gaps   │
    └────┬────┘       └──────┬──────┘     └─────┬────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼──────┐      ┌─────▼────┐      ┌──────▼─────┐
    │ Similarity│      │ ATS Score│      │ Placement  │
    │ Calculator│      │Calculator│      │ Probability│
    │           │      │          │      │            │
    │ TF-IDF    │      │ 70% Skills+       │ Maps ATS   │
    │ Cosine    │      │ 30% Similarity    │ to ranges  │
    │ Similarity│      │ = ATS Score       │            │
    └────┬──────┘      └─────┬────┘      └──────┬─────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼──────────┐  ┌─────▼────────┐  ┌──────▼─────────┐
    │ Learning      │  │ Resume       │  │ Strength      │
    │ Roadmap       │  │ Suggestions  │  │ Scorecard     │
    │ Generator     │  │ Generator    │  │ Calculator    │
    │               │  │              │  │               │
    │ Curated       │  │ Actionable   │  │ 4-factor      │
    │ resources     │  │ improvements │  │ breakdown     │
    │ for missing   │  │              │  │               │
    │ skills        │  │ e.g. add AWS │  │ Skill 40%     │
    │               │  │ skills       │  │ Projects 25%  │
    │               │  │              │  │ Keywords 20%  │
    │               │  │              │  │ Format 15%    │
    └────┬──────────┘  └─────┬────────┘  └──────┬─────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │  JSON Response with All Metrics         │
        │  (15+ data points)                      │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │   Frontend Renders Results               │
        │  (7 Sections Displayed)                 │
        └────────────────────┬────────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │  User Sees:                              │
        │  1. ATS Score (color-coded)              │
        │  2. Matched/Missing Skills               │
        │  3. Similarity %                         │
        │  4. Resume Strength Score                │
        │  5. Improvement Suggestions              │
        │  6. Learning Resources                   │
        │  7. Score Explanations                   │
        └─────────────────────────────────────────┘
```

---

## Data Flow Example

### User Input:
```
Resume: Cloud_Engineer_2024.pdf (PDF file)
Job Description: "We're looking for a Cloud Engineer with AWS,
                 Kubernetes, Python, and CI/CD experience..."
```

### Backend Processing:

**Step 1: Resume Parsing**
```
Extract from PDF → "cloud engineer kubernetes python docker aws
                   jenkins ci cd terraform ansible"
```

**Step 2: Job Description Parsing**
```
Extract from JD → "aws kubernetes python ci cd docker jenkins
                  terraform security linux"
```

**Step 3: Skill Extraction**
```
Resume Skills: [aws, kubernetes, python, docker, jenkins,
                ci_cd, terraform, ansible]

JD Skills: [aws, kubernetes, python, ci_cd, docker, jenkins,
            terraform, security, linux]
```

**Step 4: Skill Matching**
```
Matched: [aws, kubernetes, python, ci_cd, docker, jenkins, terraform]
         = 7 matched skills

Missing: [security, linux]
         = 2 missing skills

Match %: 7/9 = 77.8%
```

**Step 5: Text Similarity**
```
TF-IDF Cosine Similarity = 74.2%
```

**Step 6: ATS Score**
```
ATS = (70% × 77.8%) + (30% × 74.2%)
    = (0.70 × 0.778) + (0.30 × 0.742)
    = 0.5446 + 0.2226
    = 76.72% → "Good" band
```

**Step 7: Placement Probability**
```
ATS Score 76.72% → "High (70-90%)" placement chance
```

### Frontend Output:
```
┌─────────────────────────────────────────────┐
│         ATS SCORE: 76.72% (GOOD)             │
│      PLACEMENT: High (70-90%)                │
├─────────────────────────────────────────────┤
│ SKILLS: 7/9 matched (77.8%)                 │
│  ✓ Matched: AWS, Kubernetes, Python, ...    │
│  ✗ Missing: Security, Linux                 │
├─────────────────────────────────────────────┤
│ RESUME STRENGTH: 72/100                     │
│  ├─ Skill Match (40%): 31/40                │
│  ├─ Projects (25%): 18/25                   │
│  ├─ Keywords (20%): 14/20                   │
│  └─ Format (15%): 9/15                      │
├─────────────────────────────────────────────┤
│ LEARNING ROADMAP:                           │
│  → Security: Beginner → Intermediate        │
│     • Resources: Security+, Linux Academy   │
│  → Linux: Beginner → Advanced               │
│     • Resources: Linux Foundation, ...      │
├─────────────────────────────────────────────┤
│ SUGGESTIONS:                                 │
│  1. Add Linux administration experience     │
│  2. Include security certifications         │
│  3. Expand infrastructure examples          │
└─────────────────────────────────────────────┘
```

---

## API Contract

### Request

**Endpoint:** `POST /api/analyze/`

**Format:** `multipart/form-data`

```
Headers:
  Content-Type: multipart/form-data; boundary=----

Body:
  ------
  Content-Disposition: form-data; name="resume"; filename="resume.pdf"
  Content-Type: application/pdf

  [PDF binary content]
  ------
  Content-Disposition: form-data; name="job_description"

  We are looking for a Cloud Engineer...
  ------
```

### Response

**Status:** `200 OK`

**Content-Type:** `application/json`

```json
{
  "similarity_score_percent": 74.2,
  "ats_score_percent": 76.72,
  "ats_quality_band": "Good",
  "placement_probability": "High (70-90%)",
  "matched_skills": ["aws", "kubernetes", "python", "ci_cd",
                     "docker", "jenkins", "terraform"],
  "missing_skills": ["security", "linux"],
  "match_breakdown": {
    "skills_match_percentage": 77.78,
    "matched_skill_count": 7,
    "missing_skill_count": 2,
    "total_required_skills": 9
  },
  "selection_summary": {
    "chance": "High",
    "band": "Good",
    "message": "Your profile aligns well with this position. ..."
  },
  "resume_strength_scorecard": {
    "total_score": 72.5,
    "breakdown": {
      "Skill Match (40%)": 31.2,
      "Projects Relevance (25%)": 18.5,
      "Experience Keywords (20%)": 14.0,
      "Length & Formatting (15%)": 9.0
    }
  },
  "learning_roadmap": {
    "security": {
      "level": "Beginner → Intermediate",
      "suggested_resources": [
        "https://www.udemy.com/course/security-plus/",
        "https://academy.hackthebox.com/",
        "https://www.coursera.org/..."
      ]
    },
    "linux": {
      "level": "Beginner → Advanced",
      "suggested_resources": [...]
    }
  },
  "resume_suggestions": [
    "Add specific Linux administration experience",
    "Include cloud security certifications",
    "Expand infrastructure project examples",
    "Mention container orchestration achievements"
  ],
  "score_explanations": {
    "similarity_score": "Text similarity is 74.2%, indicating...",
    "ats_score": "ATS score 76.72% (Good) combines skill match...",
    "skills": "7 out of 9 required skills were found..."
  }
}
```

---

## Technology Stack

### Backend
- **Framework**: Django 6.0.1
- **API**: Django REST Framework 3.14.0
- **CORS**: django-cors-headers 4.3.1
- **PDF Processing**: pdfplumber 0.10.3
- **NLP/ML**: scikit-learn 1.3.2
- **Data Processing**: pandas, numpy, scipy
- **Database**: SQLite3 (can upgrade to PostgreSQL)
- **Python**: 3.10+

### Frontend
- **Framework**: Next.js 16.1.6
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS 4.2.0
- **Components**: Radix UI
- **Charts**: Recharts 2.15.0
- **Icons**: Lucide React 0.564.0
- **TypeScript**: 5.7.3

---

## Key Components Breakdown

### Backend Components

1. **Views** (`analyzer/views.py`)
   - `analyze_resume()` - Main API endpoint
   - `_extract_pdf_text()` - PDF text extraction
   - `_round_floats()` - Response formatting

2. **NLP Pipeline** (`analyzer/nlp/final_pipeline.py`)
   - `run_resymatch_pipeline()` - Orchestrates all analysis steps
   - Returns comprehensive JSON result

3. **Supporting Modules**
   - `resume_parser.py` - PDF text extraction
   - `skill_extractor.py` - Skill identification from resume
   - `jd_skill_extractor.py` - Skill identification from JD
   - `skill_matcher.py` - Find overlaps and gaps
   - `similarity.py` - TF-IDF text similarity
   - `ats_score.py` - ATS score calculation
   - `placement_probability.py` - Probability mapping
   - `resume_suggestions.py` - Improvement suggestions
   - `learning_roadmap.py` - Learning resource generation
   - `resume_strength_scorecard.py` - Multi-factor scoring

### Frontend Components

1. **Page** (`app/page.tsx`)
   - Main layout and state management
   - Handles API calls
   - Error/loading states

2. **Input Component** (`InputSection.tsx`)
   - PDF file upload with drag-drop
   - Job description text area
   - Analyze button

3. **Result Components**
   - `ATSScoreCard.tsx` - Priority display
   - `SkillMatchSection.tsx` - Skills analysis
   - `SimilarityScoreCard.tsx` - Similarity metric
   - `ResumeStrengthScorecard.tsx` - 4-factor breakdown
   - `SuggestionsSection.tsx` - Improvement tips
   - `LearningRoadmap.tsx` - Learning resources
   - `ScoreExplanations.tsx` - Explanations

---

## Configuration Summary

### Django Settings Additions

```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.JSONParser',
    ],
}

# File upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
```

### Frontend Environment

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## Deployment Checklist

- [ ] Update Django `ALLOWED_HOSTS` with domain
- [ ] Set Django `DEBUG = False`
- [ ] Update `CORS_ALLOWED_ORIGINS` with production frontend URL
- [ ] Update `NEXT_PUBLIC_API_BASE_URL` with production backend URL
- [ ] Use production database (PostgreSQL recommended)
- [ ] Set up HTTPS/SSL
- [ ] Configure environment variables securely
- [ ] Add monitoring and logging
- [ ] Test API endpoints with production data
- [ ] Deploy backend (Heroku, Railway, Render, AWS, etc.)
- [ ] Deploy frontend (Vercel, Netlify, AWS, etc.)

---

## Performance Considerations

1. **PDF Processing** - Time depends on PDF size and complexity
2. **NLP Pipeline** - Typically 1-3 seconds per analysis
3. **File Upload Limit** - Currently 5MB (configurable)
4. **Caching** - Consider caching similar JD analyses
5. **Scaling** - Frontend is stateless, backend can be scaled horizontally

---

This architecture provides a clean separation of concerns, scalability, and maintainability.
