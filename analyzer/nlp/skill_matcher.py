def match_skills(resume_skills, jd_skills):
    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    matched_skills = list(resume_set & jd_set)
    missing_skills = list(jd_set - resume_set)

    return matched_skills, missing_skills
