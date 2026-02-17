from analyzer.nlp.resume_suggestions import generate_resume_suggestions

resume_text = """
I am a Python developer with Django knowledge.
"""
matched_skills = ["Python", "Django"]
missing_skills = ["AWS", "Docker"]
ats_score = 52.4

output = generate_resume_suggestions(
    resume_text,
    matched_skills,
    missing_skills,
    ats_score
)

for i, s in enumerate(output, 1):
    print(f"{i}. {s}")
