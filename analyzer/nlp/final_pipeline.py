# ===== Imports =====
      # Module 1
from analyzer.nlp.jd_skill_extractor import extract_jd_skills       # Module 3
from analyzer.nlp.skill_extractor import extract_resume_skills




     # Module 2
from analyzer.nlp.skill_matcher import match_skills                # Module 4
from analyzer.nlp.similarity_score import calculate_similarity     # Module 5
from analyzer.nlp.ats_score import calculate_ats_score             # Module 6
from analyzer.nlp.placement_probability import placement_probability  # Module 7
from analyzer.nlp.learning_roadmap import generate_learning_roadmap
   # Module 8
from analyzer.nlp.resume_suggestions import resume_suggestions         # Module 9
from analyzer.nlp.resume_strength_scorecard import resume_strength_scorecard  # Module 10


def run_resymatch_pipeline(resume_text, job_description):
    # 1️⃣ Resume Parsing
    parsed_resume = resume_text.lower()

    # 2️⃣ Resume Skill Extraction
    resume_skills = extract_resume_skills(resume_text)

    jd_skills = extract_jd_skills(job_description)


    # 4️⃣ Skill Matching
    matched_skills, missing_skills = match_skills(resume_skills, jd_skills)

    # 5️⃣ Similarity Score
    similarity = calculate_similarity(resume_text, job_description)

    # 6️⃣ ATS Score
    ats = calculate_ats_score(
        matched_skills,
        jd_skills,
        similarity
    )

    # 7️⃣ Placement Probability
    placement = placement_probability(ats)

    # 8️⃣ Learning Roadmap
    roadmap = generate_learning_roadmap(missing_skills)

    # 9️⃣ Resume Suggestions
    suggestions = resume_suggestions(
    resume_text,
    missing_skills,
    ats
)


    # 🔟 Resume Strength Scorecard
    strength = resume_strength_scorecard(
        resume_text,
        matched_skills,
        jd_skills
    )

    # 📊 Final Output
    return {
        "Matched Skills": matched_skills,
        "Missing Skills": missing_skills,
        "Similarity Score (%)": similarity,
        "ATS Score (%)": ats,
        "Placement Probability (%)": placement,
        "Resume Strength Scorecard": strength,
        "Learning Roadmap": roadmap,
        "Resume Suggestions": suggestions
    }
