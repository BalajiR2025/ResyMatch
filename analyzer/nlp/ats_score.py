def calculate_ats_score(matched_skills, jd_skills, similarity):
    skill_score = (len(matched_skills) / max(len(jd_skills), 1)) * 100
    ats_score = (0.7 * skill_score) + (0.3 * similarity)
    return round(ats_score, 2)
