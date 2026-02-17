from analyzer.nlp.skills_list import SKILLS

NORMALIZATION_MAP = {
    "python3": "python",
    "python 3": "python",
    "aws ec2": "aws",
    "aws s3": "aws",
    "dockerized": "docker",
    "k8s": "kubernetes"
}

def extract_resume_skills(resume_text: str):
    resume_text = resume_text.lower()

    for key, value in NORMALIZATION_MAP.items():
        resume_text = resume_text.replace(key, value)

    found_skills = []

    for skill in SKILLS:
        if skill.lower() in resume_text:
            found_skills.append(skill.lower())

    return list(set(found_skills))
