from analyzer.nlp.missing_skills import get_missing_skills

resume_skills = ["python", "django", "sql"]
jd_skills = ["python", "django", "sql", "aws", "docker"]

print(get_missing_skills(resume_skills, jd_skills))
