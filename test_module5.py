from analyzer.nlp.similarity import calculate_similarity

resume = "Python Django SQL developer with backend experience"
jd = "Looking for a Python Django developer with SQL knowledge"

print(calculate_similarity(resume, jd))
