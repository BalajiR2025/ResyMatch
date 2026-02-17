def get_missing_skills(resume_skills: list, jd_skills: list) -> list:
    """
    Returns skills that are present in JD but missing in resume
    """
    if not resume_skills or not jd_skills:
        return []

    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    missing = jd_set - resume_set
    return list(missing)
