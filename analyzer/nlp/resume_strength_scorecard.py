def resume_strength_scorecard(
    resume_text,
    matched_skills,
    required_skills
):
    resume_lower = resume_text.lower()
    total_score = 0
    breakdown = {}

    # 1️⃣ Skill Match – 40%
    if required_skills:
        skill_ratio = len(matched_skills) / len(required_skills)
        skill_score = round(skill_ratio * 40, 2)
    else:
        skill_score = 0

    breakdown["Skill Match (40%)"] = skill_score
    total_score += skill_score

    # 2️⃣ Projects Relevance – 25%
    project_score = 0
    if "project" in resume_lower:
        project_score += 10

    keyword_hits = sum(1 for skill in matched_skills if skill.lower() in resume_lower)
    project_score += min(keyword_hits * 3, 15)

    breakdown["Projects Relevance (25%)"] = project_score
    total_score += project_score

    # 3️⃣ Experience Keywords – 20%
    experience_score = 0
    experience_keywords = ["experience", "internship", "worked", "company", "role"]

    for word in experience_keywords:
        if word in resume_lower:
            experience_score += 4

    experience_score = min(experience_score, 20)
    breakdown["Experience Keywords (20%)"] = experience_score
    total_score += experience_score

    # 4️⃣ Resume Length & Formatting – 15%
    length_score = 0
    word_count = len(resume_text.split())

    if 300 <= word_count <= 800:
        length_score += 10
    else:
        length_score += 5

    section_checks = ["skills", "education", "experience", "project"]
    length_score += sum(1 for s in section_checks if s in resume_lower)

    length_score = min(length_score, 15)
    breakdown["Length & Formatting (15%)"] = length_score
    total_score += length_score

    return {
        "total_score": round(total_score, 2),
        "breakdown": breakdown
    }
