from .skills_list import SKILLS

def extract_skills(resume_text: str) -> list:
    if not resume_text:
        return []

    resume_text = resume_text.lower()
    extracted = []

    for skill in SKILLS:
        if skill in resume_text:
            extracted.append(skill)

    return list(set(extracted))
