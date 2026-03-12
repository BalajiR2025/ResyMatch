from analyzer.nlp.jd_skill_extractor import extract_jd_skills
from analyzer.nlp.skill_extractor import extract_resume_skills
from analyzer.nlp.skill_matcher import match_skills
from analyzer.nlp.similarity import calculate_similarity
from analyzer.nlp.ats_score import (
    calculate_ats_score,
    ats_quality_band,
)
from analyzer.nlp.placement_probability import placement_probability
from analyzer.nlp.learning_roadmap import generate_learning_roadmap
from analyzer.nlp.resume_suggestions import resume_suggestions
from analyzer.nlp.resume_strength_scorecard import resume_strength_scorecard
from analyzer.nlp.selection_prediction import predict_selection


def _build_match_breakdown(matched_skills, missing_skills, jd_skills):
    """
    Build a simple per-section style breakdown focused on skills.
    """
    total_required = len(jd_skills) if jd_skills else 0
    matched_count = len(matched_skills)
    missing_count = len(missing_skills)

    skills_match_pct = (
        round((matched_count / total_required) * 100, 2) if total_required else 0.0
    )

    return {
        "skills_match_percentage": skills_match_pct,
        "matched_skill_count": matched_count,
        "missing_skill_count": missing_count,
        "total_required_skills": total_required,
    }


def _build_score_explanations(similarity, ats, matched_skills, missing_skills, jd_skills):
    """
    Create short, human-readable explanations for the main scores.
    """
    quality_band = ats_quality_band(ats)

    explanations = {
        "similarity_score": (
            f"Text similarity between resume and job description is {similarity}%, "
            "based on TF–IDF cosine similarity over the full text."
        ),
        "ats_score": (
            f"ATS score is {ats}% ({quality_band}). It combines skill match with "
            "overall text similarity to approximate how an ATS might rank this resume."
        ),
    }

    if jd_skills:
        explanations["skills"] = (
            f"{len(matched_skills)} out of {len(jd_skills)} required skills were found "
            f"in the resume. Missing skills: {', '.join(missing_skills) or 'None'}."
        )

    return explanations


def run_resymatch_pipeline(resume_text, job_description):
    """
    End-to-end pipeline that compares a resume against a job description and
    returns structured match information.

    High-level steps:
    - Extract skills from the resume and job description.
    - Match skills to find overlaps and gaps.
    - Compute a TF–IDF cosine-based similarity score between texts.
    - Derive an ATS-style score that blends skill match and similarity.
    - Interpret the ATS score into placement probability and selection chance.
    - Generate a learning roadmap, resume suggestions, and a strength scorecard.
    """
    # 1️⃣ Resume Skill Extraction
    resume_skills = extract_resume_skills(resume_text)

    # 2️⃣ JD Skill Extraction
    jd_skills = extract_jd_skills(job_description)

    # 3️⃣ Skill Matching
    matched_skills, missing_skills = match_skills(resume_skills, jd_skills)

    # 4️⃣ Similarity Score (TF–IDF cosine similarity)
    similarity = calculate_similarity(resume_text, job_description)

    # 5️⃣ ATS Score
    ats = calculate_ats_score(
        matched_skills,
        jd_skills,
        similarity,
    )

    # 6️⃣ Placement Probability (qualitative probability range)
    placement = placement_probability(ats)

    # 7️⃣ Learning Roadmap
    roadmap = generate_learning_roadmap(missing_skills)

    # 8️⃣ Resume Suggestions
    suggestions = resume_suggestions(
        resume_text,
        missing_skills,
        ats,
    )

    # 9️⃣ Resume Strength Scorecard
    strength = resume_strength_scorecard(
        resume_text,
        matched_skills,
        jd_skills,
    )

    # 🔟 Derived meta information
    match_breakdown = _build_match_breakdown(matched_skills, missing_skills, jd_skills)
    score_explanations = _build_score_explanations(
        similarity, ats, matched_skills, missing_skills, jd_skills
    )
    selection_summary = predict_selection(ats)

    # 📊 Final Output
    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "similarity_score_percent": similarity,
        "ats_score_percent": ats,
        "ats_quality_band": ats_quality_band(ats),
        "placement_probability": placement,
        "selection_summary": selection_summary,
        "resume_strength_scorecard": strength,
        "learning_roadmap": roadmap,
        "resume_suggestions": suggestions,
        "match_breakdown": match_breakdown,
        "score_explanations": score_explanations,
    }
