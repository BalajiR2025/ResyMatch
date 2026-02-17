from .skills_list import SKILLS

def extract_jd_skills(jd_text: str) -> list:
    if not jd_text:
        return []

    jd_text = jd_text.lower()
    extracted = []

    for skill in SKILLS:
        if skill in jd_text:
            extracted.append(skill)

    return list(set(extracted))
