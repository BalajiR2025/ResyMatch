# django_app/analyzer/nlp/skill_extractor.py

from .skills_list import SKILLS

def extract_skills(resume_text: str) -> list:
    """
    Extracts technical skills from resume text
    using keyword matching.
    """
    resume_text = resume_text.lower()
    extracted_skills = []

    for skill in SKILLS:
        if skill in resume_text:
            extracted_skills.append(skill)

    # remove duplicates
    return list(set(extracted_skills))
