from analyzer.nlp.ats_score import calculate_ats_score

similarity = 50.31
resume_skills = ["python", "django", "sql"]
jd_skills = ["python", "django", "sql", "aws", "docker"]

print(calculate_ats_score(similarity, resume_skills, jd_skills))
