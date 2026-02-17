LEARNING_MAP = {
    "python": ["Basics", "OOP", "Data Structures"],
    "django": ["Models", "Views", "REST APIs"],
    "aws": ["EC2", "S3", "IAM"],
    "docker": ["Images", "Containers", "Docker Compose"],
    "sql": ["Joins", "Indexes", "Optimization"],
    "git": ["Branches", "PRs", "CI/CD"],
}

def generate_roadmap(missing_skills):
    roadmap = {}
    for skill in missing_skills:
        key = skill.lower()
        roadmap[skill] = LEARNING_MAP.get(
            key,
            ["Basics", "Intermediate concepts", "Advanced usage"]
        )
    return roadmap
