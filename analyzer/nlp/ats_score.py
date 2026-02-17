def calculate_ats_score(similarity_score: float,
                        resume_skills: list,
                        jd_skills: list) -> float:
    """
    ATS score based on:
    - 60% weight: similarity score
    - 40% weight: skill match percentage
    """
    if not jd_skills:
        return 0.0

    matched_skills = set(resume_skills) & set(jd_skills)
    skill_match_pct = (len(matched_skills) / len(set(jd_skills))) * 100

    ats_score = (0.6 * similarity_score) + (0.4 * skill_match_pct)
    return round(ats_score, 2)
