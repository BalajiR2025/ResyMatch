from analyzer.nlp.jd_skill_extractor import extract_jd_skills

jd = "We need Python, , java,Django, SQL and AWS experience"
print(extract_jd_skills(jd))
