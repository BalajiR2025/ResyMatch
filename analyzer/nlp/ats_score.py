def calculate_ats_score(matched_skills, jd_skills, similarity):
    """
    Compute an ATS-style score combining skill match and text similarity.

    - Skill match: percentage of required JD skills present in the resume.
    - Similarity: overall resume–JD text similarity (0–100) from the NLP layer.
    """
    total_required = max(len(jd_skills), 1)
    skill_score = (len(matched_skills) / total_required) * 100

    # Weighted blend of skills and similarity.
    ats_score = (0.7 * skill_score) + (0.3 * similarity)
    return round(ats_score, 2)


def ats_quality_band(ats_score: float) -> str:
    """
    Map a numeric ATS score to a qualitative band.

    - 80–100 → Excellent
    - 65–79  → Good
    - 50–64  → Fair
    - 0–49   → Poor
    """
    if ats_score >= 80:
        return "Excellent"
    if ats_score >= 65:
        return "Good"
    if ats_score >= 50:
        return "Fair"
    return "Poor"

